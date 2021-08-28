import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, ɵangular_packages_platform_browser_platform_browser_j } from '@angular/platform-browser';

import { MatDialog } from '@angular/material/dialog';
import { ModalInputComponent } from '../components/modal-input/modal-input.component';

import { mensagens } from '../../constants/mensagens.const';
import { Message } from '../utils/message';
import { LoginService } from './login.service';
import { RevealWindowService } from '../components/reveal-window/reveal-window.service';
import { ApiService } from './api.service';

import { environment } from '../../../environments/environment';
import { SimpleCarouselComponent } from '../components/simple-carousel/simple-carousel.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private dialogRef: any;
  public validations: string[];

  constructor(private dialog: MatDialog, private apiService: ApiService, private router: Router, private sanitizer: DomSanitizer, private revealService: RevealWindowService) {
    this.hideErrorPage();
  }

  openDialog(title: string, caption?: string, url?: string, modalType?: string) {

    this.dialogRef = this.dialog.open(ModalInputComponent, {
      data: {
        title: title,
        invalidFields: this.validations,
        caption: caption,
        url: url,
        modalType: modalType
      }
    })

    this.dialogRef.afterClosed().subscribe(result => {
      this.validations = [];
    });
  }


  navigateTo(url) {
    this.router.navigate([url]);
  }

  abrirModalAposCadastroDoUsuario(caption?: string, url?: string, modalType?: string) {

    this.dialogRef = this.dialog.open(ModalInputComponent, {
      data: {
        caption: caption,
        url: url,
        modalType: modalType
      }
    })

    this.dialogRef.afterClosed().subscribe(result => {
      if (modalType == 'success') {
        this.revealService.close();
      }
    });
  }

  onErrorResponse(response: any, loginService?: LoginService, hideModal?: boolean) {
    switch (response.status) {
      case 400:
        this.validations = response.error.validations;
        this.openDialog('', null, null, 'warning');
        break;
      case 401:
        if (loginService) {
          loginService.removeActiveStyles();
          loginService.removeActiveKeys();
          loginService.estaLogado = false;
        }

        if (response.url.includes('login')) {
          this.openDialog(null, mensagens.legenda.usuario_senha_invalidos, null, 'error');
          return;
        }

        if (response.url.includes('ping')) {
          return;
        }

        // if (hideModal){
        //   this.showErrorPage(mensagens.titulo.sessao_expirada, mensagens.legenda.sessao_expirada);
        //   return;
        // }

        this.openDialog(null, mensagens.legenda.sessao_expirada, null, 'error');
        break;
      case 404:
        this.openDialog(null, mensagens.legenda.nao_encontrado, null, 'warning');
        break;
      case 500:
        this.openDialog(null, mensagens.legenda.erro_generico, null, 'error')
        break;
      default:
        if (hideModal) {
          this.showErrorPage('Ops!', mensagens.legenda.erro_generico);
          return;
        }

        this.openDialog(null, mensagens.legenda.erro_generico, null, 'error');
        break;
    }
  }

  showErrorPage(title, subtitle) {
    const errorMessage: any = document.querySelector('#errorPageMessage');
    const errorMessageTitle = document.querySelector('#errorMessageTitle');
    const errorMessageSubtitle = document.querySelector('#errorPageSubtitle');

    errorMessageSubtitle.innerHTML = subtitle;
    errorMessageTitle.innerHTML = title;
    errorMessage.style.display = 'block';
  }

  hideErrorPage() {
    const errorMessage: any = document.querySelector('#errorPageMessage');
    if (errorMessage) {
      errorMessage.style.display = 'none';
    }
  }

  removerBarraDeRolagem() {
    const body = document.querySelector('body');
    body.style.overflowY = 'hidden';
  }

  inserirBarraDeRolagem() {
    const body = document.querySelector('body');
    body.style.overflowY = 'auto';
  }

  formatarImagemComoBase64(imagem: any, tipo: string) {
    const data = "data:";
    const type = tipo + ';';
    const charset = "charset=utf-8;"
    const prefix = 'base64,'

    return `${data}${type}${charset}${prefix}${imagem}`;
  }

  registrarErroParaTratarFuturamente(erro: any) {
    localStorage.setItem('recuperabilidade_tem_erros', 'true');
    localStorage.setItem(erro.tipo, erro.id);
  }

  refazerOperacoesQueDeramErro(tipo) {
    let id: any;

    switch (tipo) {
      case 'recuperabilidade_upload_anexos':
        id = localStorage.getItem('recuperabilidade_upload_anexos');
        this.apiService.removerPorId(`${environment.endpoints.desaparecidos}/${id}`)
          .toPromise()
          .then((message: any) => {
            if (message.success) {
              this.limparChavesErroRecuperabilidade();
            }
          })
          .catch(err => {
            localStorage.setItem('recuperabilidade_upload_anexos', id);
          });
        break;
    }
  }

  limparChavesErroRecuperabilidade() {
    localStorage.removeItem('recuperabilidade_upload_anexos');
    localStorage.removeItem('recuperabilidade_tem_erros');
  }

  setMainContainer(paddingLeft?: string, paddingRight?: string, paddingTop?: string)  {
    const main_container = (<HTMLElement>document.querySelector('.main-container'));
    main_container.style.paddingLeft = paddingLeft;
    main_container.style.paddingRight = paddingRight;
    main_container.style.paddingTop = paddingTop;
  }

  unSetMainContainer() {
    const main_container = (<HTMLElement>document.querySelector('.main-container'));
    main_container.style.paddingLeft = '20px';
    main_container.style.paddingRight = '20px';
    main_container.style.paddingTop = '90px';
  }

  renderizarImagensNoIvyCarousel(imagens: any, carouselComponent: SimpleCarouselComponent) {
    imagens.forEach((item, index) => {
      carouselComponent.images[index] = {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(this.formatarImagemComoBase64(item.arquivo, item.tipo))
      }
    });

    let dots: any = Array.from(document.querySelectorAll('.carousel-dot'));
    let indexToDelete = [];

    carouselComponent.images.forEach((item, indexCarousel) => {
      if (!item.path) {
        dots[indexCarousel].style.display = 'none';
      }
    });

    carouselComponent.clearEmptySpaceAtImages();
  }

}
