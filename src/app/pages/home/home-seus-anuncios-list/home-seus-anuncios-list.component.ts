import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { Message } from '../../../shared/utils/message';

import { ApiService } from '../../../shared/services/api.service';
import { CommonService } from '../../../shared/services/common.service';
import { LoginService } from '../../../shared/services/login.service';

@Component({
  selector: 'app-home-seus-anuncios-list',
  templateUrl: './home-seus-anuncios-list.component.html',
  styleUrls: ['./home-seus-anuncios-list.component.scss']
})
export class HomeSeusAnunciosListComponent implements OnInit {

  quantidadeItensCadastrados: number;
  quantidadeItensRetornadosNaPesquisa: number = 1;

  anuncios: any;
  anunciosPesquisados: any;

  cardType: string = 'anuncio';
  alturaSearchBar: string = '90%';
  statusPesquisa: string = '';

  isPesquisarAtivado: boolean = false;
  isLoading: boolean = false;
  isLoadingSearchBar: boolean;
  isLightboxVisible: boolean;
  isSearchBarVisible: boolean;
  error: boolean;
  usouScroll: boolean;

  pagina: number = 1;
  quantidade: number = 4;
  paginaPesquisa: number = 1;
  quantidadeItensPesquisa: number = 4;
  filtroPesquisa: string;

  index: number = 0
  indexPesquisa: number = 0;
  scrollAtual: number = 0;

  @ViewChild('campoPesquisaDeAnuncios')
  campoPesquisaDeAnuncios;

  searchTimeout: any;

  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService, private loginService: LoginService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.setStyles(true);
    this.inicializar();
    this.anunciosPesquisados = [];
  }

  ngOnDestroy() {
    this.setStyles(false);
    this.limparListaPesquisa();
  }

  inicializar() {
    this.anuncios = [];
    this.anunciosPesquisados = [];
    this.isLoading = true;
    this.quantidadeItensCadastrados = parseInt(localStorage.getItem('quantidadeItensCadastrados'));

    if (this.anuncios.length < this.quantidadeItensCadastrados) {
      for (var indice = 0; indice < this.quantidade && indice < this.quantidadeItensCadastrados; indice++) {
        this.anuncios.push({ imagem: null, nomeDoDesaparecido: '', quantidadePessoasQueViramDesaparecido: 0 })
      }
    }


    this.obterImagens();

    window.scrollTo(0, 0);
  }


  obterImagens() {
    if (this.index < this.quantidadeItensCadastrados) {
      this.apiService.get(`${environment.endpoints.anuncios_cadastrados}/${this.pagina}/${this.quantidade}`)
        .toPromise()
        .then((message: Message) => {
          this.onSuccessObterAnunciosCadastrados(message);
        })
        .catch(err => {
          this.error = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }

  pesquisar() {
    this.apiService
      .obterQuantidadeItensRetornadosPesquisaPorFiltro(environment.endpoints.quantidadeItensRetornadosPesquisaDesaparecidosPorNome, this.filtroPesquisa)
      .toPromise()
      .then((message: Message) => {
        this.quantidadeItensRetornadosNaPesquisa = message.data;

        if (this.anunciosPesquisados.length < this.quantidadeItensRetornadosNaPesquisa) {
          for (var indice = 0; (indice < this.quantidadeItensPesquisa && indice < this.quantidadeItensRetornadosNaPesquisa); indice++) {
            this.anunciosPesquisados.push({
              imagem: '',
              nomeDoDesaparecido: '',
              quantidadePessoasQueViramDesaparecido: 10

            });
          }
        }

        this.apiService.search(`${environment.endpoints.search}`, this.filtroPesquisa, this.paginaPesquisa, this.quantidadeItensPesquisa)
          .toPromise()
          .then((message: Message) => {
            this.onSuccessPesquisa(message.data);
          }).catch(err => {
            this.statusPesquisa = 'resultadoNaoEncontrado';
          })
          .finally(() => {
            this.isLoadingSearchBar = true;
          });;
      }).catch(err => {
        console.log(err);
      });

  }

  pesquisarComBarraDeRolagem() {
    if (this.anunciosPesquisados.length < this.quantidadeItensRetornadosNaPesquisa) {
      for (var indice = this.indexPesquisa; indice < this.quantidadeItensRetornadosNaPesquisa; indice++) {
        this.anunciosPesquisados.push({
          imagem: '',
          nomeDoDesaparecido: '',
          quantidadePessoasQueViramDesaparecido: 10

        });
      }
    }


    this.apiService.search(`${environment.endpoints.search}`, this.filtroPesquisa, this.paginaPesquisa, this.quantidadeItensPesquisa)
    .toPromise()
    .then((message: Message) => {
      this.onSuccessPesquisa(message.data);
    }).catch(err => {
      this.statusPesquisa = 'resultadoNaoEncontrado';
    })
    .finally(() => {
      this.isLoadingSearchBar = true;
    });;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (window.scrollY > 0 && !this.isSearchBarVisible) {

      if (this.anuncios.length < this.quantidadeItensCadastrados) {
        this.anuncios.push({ imagem: null, nomeDesaparecido: '', quantidadePessoasQueViramDesaparecido: 0 });
      }
      else {
        const total = this.quantidadeItensCadastrados / this.quantidade;
        if (this.pagina < total) {
          this.pagina++;

          this.obterImagens();
        }

      }
    }
    // else if (window.scrollY > 0) {
    //   const totalPaginasPesquisa = this.quantidadeItensRetornadosNaPesquisa / this.quantidadeItensPesquisa;
    //   if (this.paginaPesquisa < totalPaginasPesquisa) {
    //     this.paginaPesquisa++;
    //     this.pesquisar();
    //   }
    //}
  }

  setStyles(active: boolean) {
    const main_container = (<HTMLElement>document.querySelector('.main-container'));
    const grid = (<HTMLElement>document.querySelector('#containerPesquisaAnuncios'));

    if (active) {
      main_container.style.paddingLeft = '0px';
      main_container.style.paddingRight = '0px';
      main_container.style.paddingBottom = '50px';

      grid.style.paddingLeft = '20px';
      grid.style.paddingRight = '20px';

      return;
    }

    main_container.style.paddingLeft = '20px';
    main_container.style.paddingRight = '20px';
    main_container.style.paddingBottom = '70px';

    grid.style.paddingLeft = '20px';
    grid.style.paddingRight = '20px';

  }

  onSuccessObterAnunciosCadastrados(message: Message) {
    this.error = false;

    if (message.data && message.data.length > 0) {

      message.data.forEach(desaparecido => {
        if (desaparecido.anexos.length <= 0) {
          return;
        }

        const image_data = "data:";
        const image_type = desaparecido.anexos[0] ? desaparecido.anexos[0].tipo + ';' : null;
        const image_charset = "charset=utf-8;"
        const image_base64_prefix = 'base64,'
        const image_formated = `${image_data}${image_type}${image_charset}${image_base64_prefix}${desaparecido.anexos[0].arquivo}`;
        const image_final = this.sanitizer.bypassSecurityTrustResourceUrl(image_formated);

        this.anuncios[this.index].imagem = image_final;
        this.anuncios[this.index].nomeDoDesaparecido = desaparecido.nome.length > 35 ? desaparecido.nome.substring(0, 35) + '...' : desaparecido.nome;
        this.anuncios[this.index].quantidadePessoasQueViramDesaparecido = 10;
        this.anuncios[this.index].url = `home/seus-anuncios/detalhes/${desaparecido.id}`;

        ++this.index;


      });

      this.commonService.hideErrorPage();
    }
  }

  onSuccessPesquisa(resultados: any) {
    this.error = false;

    resultados.forEach(item => {

      if (item.anexos.length <= 0) {
        return;
      }

      const imagemBase64 = this.commonService.formatarImagemComoBase64(item.anexos[0].arquivo, item.anexos[0].tipo);
      const thumbnail = this.sanitizer.bypassSecurityTrustResourceUrl(imagemBase64);

      this.anunciosPesquisados[this.indexPesquisa].imagem = thumbnail;
      this.anunciosPesquisados[this.indexPesquisa].nomeDoDesaparecido = item.nome.length > 35 ? item.nome.substring(0, 35) + '...' : item.nome;
      this.anunciosPesquisados[this.indexPesquisa].quantiadePessoasQueViramDesaparecido = 10;
      this.anunciosPesquisados[this.indexPesquisa].url = `home/seus-anuncios/detalhes/${item.id}`;

      this.indexPesquisa++;
    });

    this.statusPesquisa = 'ok';

    this.commonService.hideErrorPage();
  }


  onOpen(event) {
    this.router.navigate([event]);
  }

  quandoUsuarioClicarNoIconeDePesquisa() {
    this.isSearchBarVisible = true;
    this.statusPesquisa = 'default';
    this.commonService.removerBarraDeRolagem();
  }

  quandoUsuarioClicarNoIconeDeRetorno(event) {
    this.alturaSearchBar = '90%';
    this.isSearchBarVisible = false;
    this.isLoadingSearchBar = false;
    this.limparListaPesquisa();

  }

  onClickBuscar() {
    this.isLoading = !this.isLoading;
  }


  quandoUsuarioConfirmarPesquisa(consulta: any) {
    this.filtroPesquisa = consulta.value;
    this.isSearchBarVisible = true;
    this.isLoadingSearchBar = true;
    this.statusPesquisa = 'carregando';

    if (consulta.pagina) {
      this.paginaPesquisa = consulta.pagina;
    }

    if (consulta.jaFezUmaPesquisaAntes && this.paginaPesquisa != 1) {
      this.isLoadingSearchBar = false;
      this.statusPesquisa = 'ok';
      this.pesquisarComBarraDeRolagem();
    }
    else {
      this.anunciosPesquisados = [];
      this.paginaPesquisa = 1;
      this.indexPesquisa = 0;
      this.pesquisar();
    }
  }

  quandoUsuarioLimparPesquisa(event) {
    this.isLoadingSearchBar = false;
  }

  onCloseLightBox(event) {
    this.isLightboxVisible = !event;
  }

  onSubmit() {

  }

  limparListaPesquisa() {
    this.anunciosPesquisados = [];
    this.statusPesquisa = '';
    this.paginaPesquisa = 1;
    this.quantidadeItensPesquisa = 4;
    this.commonService.inserirBarraDeRolagem();
  }

}
