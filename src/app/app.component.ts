import { Component } from '@angular/core';

import { RevealWindowService } from './shared/components/reveal-window/reveal-window.service';
import { LoginService } from './shared/services/login.service';
import { CommonService } from './shared/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string;
  headerTitle: string;
  leftHeaderIcon: string;
  revealContent: string;
  revealTitle: string;

  temUmCodigoDeAcessoValido: boolean = true;
  codigoAcesso: string;
  campoDesabilitado: boolean = true;

  recuperabilidadeTemErros: boolean;

  constructor(private revealService: RevealWindowService, private loginService: LoginService,
    private commonService: CommonService) {
  }

  ngOnInit() {

    this.recuperabilidadeTemErros = (localStorage.getItem('recuperabilidade_tem_erros') ? true : false);
    if (this.recuperabilidadeTemErros) {
      this.recuperarDeErros();
    }

    this.defineHeader();
    this.loginService.isAuthenticated();
    this.getRevealContent();
    this.info();
  }

  ngDoCheck() {
    this.defineHeader();
    this.getRevealContent();
  }


  validarAcesso() {
    this.loginService.validarCodigoAcesso(this.codigoAcesso)
      .then(codigo => {
        if (codigo)
          this.temUmCodigoDeAcessoValido = true;
      })
      .catch(err => {
        this.temUmCodigoDeAcessoValido = false;
      });
  }

  validarTamanhoCodigoAcesso() {
    if (this.codigoAcesso.length != 7) {
      this.campoDesabilitado = true;
    }
    else {
      this.campoDesabilitado = false;
    }
  }

  getRevealContent() {
    this.revealContent = localStorage.getItem('revealContent');
    this.revealTitle = localStorage.getItem('revealTitle');
  }

  defineHeader() {
    const URL = document.URL;

    if (URL.search("cadastro") > -1) {
      this.headerTitle = "Cadastro de Desaparecidos";
      this.leftHeaderIcon = "gps_fixed";
    }
    else if (URL.search("catalogo") > -1 && URL.search("detalhes") < 0) {
      this.headerTitle = "Catálogo de Desaparecidos";
      this.leftHeaderIcon = "gps_fixed";
    }
    else if (URL.search("configuracoes") > -1) {
      this.headerTitle = "Alertas"
      this.leftHeaderIcon = "gps_fixed";
    }
    else if (URL.search("seus-anuncios") > -1 && URL.search("detalhes") < 0) {
      this.headerTitle = "Seus Anúncios"
      this.leftHeaderIcon = "gps_fixed";
    }
    else if (URL.search("detalhes") > -1) {
      this.leftHeaderIcon = "arrow_back_ios";
      this.headerTitle = "voltar";
    }
    else {
      this.headerTitle = "Reencontre";
      this.leftHeaderIcon = "gps_fixed";
    }
  }

  info() {
    console.log(`Versão 1.0.0 de ${new Date().toLocaleDateString('pt-BR')}`);
  }

  onClickIcon(event) {
    this.revealService.init(this.loginService.getUsuarioEstaLogado());
    this.getRevealContent();
    this.revealService.open();
  }

  recuperarDeErros() {
    this.commonService.refazerOperacoesQueDeramErro('recuperabilidade_upload_anexos');
  }
}
