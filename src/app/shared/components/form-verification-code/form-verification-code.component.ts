import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { LoginService } from '../../services/login.service';
import { Message } from '../../utils/message';
import { RevealWindowService } from '../reveal-window/reveal-window.service';

@Component({
  selector: 'form-verification-code',
  templateUrl: './form-verification-code.component.html',
  styleUrls: ['./form-verification-code.component.scss']
})
export class FormVerificationCodeComponent implements OnInit {

  @ViewChild('codigo_digito1') codigo_digito1;
  @ViewChild('codigo_digito2') codigo_digito2;
  @ViewChild('codigo_digito3') codigo_digito3;
  @ViewChild('codigo_digito4') codigo_digito4;
  @ViewChild('codigo_digito5') codigo_digito5;
  @ViewChild('codigo_digito6') codigo_digito6;

  isLoading: boolean;
  loadingMessage: string = 'Validando o código de acesso';
  codigoDeVerificacao: string = '';

  constructor(private loginService: LoginService, private commonService: CommonService, private revealService: RevealWindowService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.codigo_digito1.nativeElement.focus();
  }

  onUpdateCodeField(value) {
    let seletor;
    let seletorAtual

    if (value && this.codigoDeVerificacao.length <= 6) {
      this.codigoDeVerificacao += value;

      seletorAtual = 'codigo_digito' + (this.codigoDeVerificacao.length);
      seletor = 'codigo_digito' + (this.codigoDeVerificacao.length + 1);
      if (this[seletor] && this[seletorAtual]) {
        this[seletorAtual].nativeElement.disabled = true;
        this[seletor].nativeElement.focus();
      }
    }

    if (value && this.codigoDeVerificacao.length == 6) {
      this.isLoading = true;
      this.loginService.cadastrar({ codigoDeVerificacao: this.codigoDeVerificacao, senha: this.loginService.senhaDoUsuario })
      .toPromise()
      .then((response) => {
        this.onSuccessCadastro(response);
      })
      .catch(err => {
        this.isLoading = false;
        this.onErrorCadastro(err);
      });
    }
  }

  reenviarCodigoDeVerificacaoPorEmail() {
    this.isLoading = true;
    this.loginService.reenviarCodigoDeVerificacao(this.loginService.emailUsuario).toPromise().then((message: Message) => {
      this.isLoading = false;
      this.codigo_digito1.nativeElement.focus();
    })
    .catch((err: Message) => {
      this.isLoading = false;
      this.onErrorCadastro(err);
    });
  }

  onSubmit(form) {
    console.log(form);
  }

  onSuccessCadastro(message: any) {
    this.isLoading = false;
    this.loginService.setActiveKeys(message);
    this.loginService.setActiveStyles();

    this.commonService.abrirModalAposCadastroDoUsuario('Seu cadastro foi efetuado com sucesso.', '/home', 'success');

  }

  onErrorCadastro(message: any) {
    this.isLoading = false;

    for(let index = 1; index <= 6; index++) {
      let seletor = 'codigo_digito' + index;
      this[seletor].nativeElement.disabled = false;
      this[seletor].nativeElement.value = '';
      this.codigoDeVerificacao = '';
    }

    this.codigo_digito6.nativeElement.blur();
    this.codigo_digito1.nativeElement.focus();

    let legenda: string;
    let modalType: string;

    if (message.status == 400) {
      legenda = message.error.validations.join();
      modalType = 'warning';
    }
    else if (message.status == 500) {
      legenda = message.error.exception.Message;
      modalType = 'error';
    }

    this.commonService.abrirModalAposCadastroDoUsuario(legenda, null, modalType);
  }
}
