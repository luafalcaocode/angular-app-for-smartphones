import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HomeComponent } from '../../pages/home/home.component';
import { CadastroComponent } from '../../pages/cadastro/cadastro.component';

import { RevealWindowService } from '../components/reveal-window/reveal-window.service';
import { ApiService } from '../services/api.service';

import { environment } from '../../../environments/environment';
import { Message } from '../utils/message';

import { CommonService } from './common.service';
import { Usuario } from '../../models/Usuario.model';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  estaLogado: boolean;
  token: string;

  homeComponent: HomeComponent;
  cadastroComponent: CadastroComponent;

  isLoading: boolean;

  emailUsuario: string;
  senhaDoUsuario: string;

  constructor(private revealService: RevealWindowService,
    private apiService: ApiService,
    private commonService: CommonService,
    private router: Router,
    private httpClient: HttpClient) {
  }

  obterUsuarioLogado() {
    return this.apiService.get(environment.endpoints.auth.usuario);
  }

  getUsuarioEstaLogado() {
    return (localStorage.getItem('usuarioEstaLogado') === 'true');
  }

  async validarCodigoAcesso(codigo: any) {

    let retorno;

    await this.httpClient.get(`${environment.endpoints.host}/${environment.endpoints.guardian}?codigoDeAcesso=${codigo}`)
      .toPromise()
      .then((message: any) => {
        if (message.statusCode = 200) {
          retorno = true;
        }
      })
      .catch(err => {
        retorno = false;
      });

    return retorno;

  }

  preCadastrar(param: any) {
    this.isLoading = true;
    this.emailUsuario = param.form.value.email;
    this.senhaDoUsuario = param.form.value.senha;

    let dados = {
      nome: param.form.value.nome,
      email: param.form.value.email
    };

    this.apiService.post(environment.endpoints.auth.pre_cadastro, dados)
      .toPromise()
      .then((message: Message) => {
        if (message.success) {
          this.onSuccessPreCadastro(message);
        }
      })
      .catch((response: any) => {
        this.isLoading = false;
        let legenda: string;
        let modalType: string;

        if (response.status == 400) {
          legenda = response.error.validations.join();
          modalType = 'warning';
        }
        else if (response.status == 500) {
          legenda = response.error.exception.Message;
          modalType = 'error';
        }

        this.commonService.abrirModalAposCadastroDoUsuario(legenda, null, modalType);
      });
  }

  cadastrar(dados: any) {
    this.isLoading = true;
    return this.apiService.post(environment.endpoints.auth.cadastro, dados);
  }

  reenviarCodigoDeVerificacao(email: string) {
    return this.apiService.get(`${environment.endpoints.auth.reenvio_codigo_verificacao}?email=${email}`);
  }


  login(formLogin: any) {
    this.isLoading = true;
    this.apiService.post(environment.endpoints.auth.login, formLogin.form.value)
      .toPromise()
      .then((message: Message) => {
        if (message.success) {
          this.onSuccessLogin(message);
        }
      })
      .catch((error: Message) => {
        this.onErrorLogin(error);
      });
  }

  logout() {
    this.isLoading = true;
    setTimeout(() => {
      localStorage.clear();
      this.removeActiveStyles();
      this.revealService.close();
      this.isLoading = false;
      this.router.navigate(['/home']);
    }, 1000);
  }

  onSuccessPreCadastro(message: Message) {
    this.isLoading = false;

    localStorage.setItem('revealContent', 'verification-code');
    localStorage.setItem('revealTitle', 'Código de verificação');
  }


  onSuccessLogin(message: Message) {
    this.isLoading = false;
    this.setActiveStyles();
    this.setActiveKeys(message);
    this.setComponentsState();
    this.commonService.hideErrorPage();
    this.revealService.close();
  }

  onErrorLoginSimple(error: any) {
    this.removeActiveStyles();
    this.removeActiveKeys();
    this.estaLogado = false;
    this.isLoading = false;
  }


  onErrorLogin(error: any, hideModal?: boolean) {
    this.removeActiveStyles();
    this.removeActiveKeys();
    this.estaLogado = false;
    this.isLoading = false;
    this.commonService.onErrorResponse(error, this, hideModal);
  }

  onSuccessPing() {
    this.setActiveStyles();
    this.setActiveKeys();
    this.setComponentsState();
    this.isLoading = false;
    this.estaLogado = true;
  }

  obterToken() {
    return localStorage.getItem('token');
  }

  setActiveStyles() {
    const headerIcon = document.getElementById('headerIcon');
    headerIcon.classList.remove('silvermine');
    headerIcon.classList.add('sky');
  }

  setActiveKeys(message?: Message) {
    if (message) {
      localStorage.setItem('token', message.data);
      localStorage.setItem('fezLogin', 'true');
    }

    localStorage.setItem('usuarioEstaLogado', 'true');
  }
  removeActiveKeys() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioEstaLogado');
  }

  setComponentsState() {
    if (this.homeComponent) {
      this.homeComponent.usuarioEstaLogado = true;
    }

    if (this.cadastroComponent) {
      this.cadastroComponent.usuarioEstaLogado = true;
    }
  }

  unsetComponentState() {
    if (this.homeComponent) {
      this.homeComponent.usuarioEstaLogado = false;
    }

    if (this.cadastroComponent) {
      this.cadastroComponent.usuarioEstaLogado = false;
    }
  }

  removeActiveStyles() {
    const headerIcon = document.getElementById('headerIcon');
    if (headerIcon) {
      headerIcon.classList.remove('sky');
      headerIcon.classList.add('silvermine');
    }
  }

  isAuthenticated() {
    this.apiService.get(environment.endpoints.ping, null)
      .toPromise()
      .then(() => {
        this.onSuccessPing();
      })
      .catch(err => {
        this.onErrorLoginSimple(err);
      })
      .finally(() => {
        this.revealService.init(this.estaLogado);
      });
  }

  setIsNotAuthenticated() {
    this.estaLogado = false;
    this.token = null;

    this.removeActiveStyles();
  }
}
