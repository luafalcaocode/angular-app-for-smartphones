import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { ModalInputComponent } from '../../shared/components/modal-input/modal-input.component';


import { CadastroService } from './cadastro.service';
import { CommonService } from '../../shared/services/common.service';
import { LoginService } from '../../shared/services/login.service';

import { Message } from '../../shared/utils/message';

import { DesaparecidoModel } from '../../models/desaparecido.model';
import { mensagens } from '../../constants/mensagens.const';

import { Erro } from '../../shared/utils/erro.util';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  passoSelecionado = 1;

  usuarioEstaLogado: boolean;
  breadCrumbEnabled: boolean = true;
  submitBussonDisabled: boolean = true;

  oneSelected: boolean;
  twoSelected: boolean;
  threeSelected: boolean;
  fourSelected: boolean;

  formulario: FormGroup;
  attachments: FormArray;
  formData: FormData = new FormData()

  invalidFields: string[];
  modalTitle: string = 'Antes de prosseguir preencha os campos abaixo:';
  mensagemCarregandoCadastro: string;

  isComplete: boolean;
  isLoading: boolean;

  constructor(private cadastroService: CadastroService,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cidade: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      estado: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],

      dataNascimento: [null],
      dataDesaparecimento: [null],

      genero: [null],
      etnia: [null],
      altura: [null],
      peso: [null],
      caracteristicaParticular: [null],
      observacao: [null],
      attachments: this.formBuilder.array([])
    });

    this.cadastroService.initialize(this);
    this.usuarioEstaLogado = this.cadastroService.usuarioEstaLogado;
  }

  quandoUsuarioSelecionarIconeDeInformacao() {
    this.commonService.openDialog(null, 'Preencha o formulário com os dados da pessoa desaparecida para que ela seja incluída no catálogo. .', null, null);
  }

  quandoUsuarioSelecionarUmPassoNaBreadcrumb(passoSelecionado) {
    if (passoSelecionado != '1') {
      if (!this.validarPreenchimentoFormulario(this.formulario)) {
        this.breadCrumbEnabled = false;
        this.submitBussonDisabled = true;
        this.commonService.validations = this.invalidFields;
        this.commonService.openDialog(null, null, null, 'warning');
        localStorage.setItem('formIsOkay', 'false');
        return;
      }

      if (!this.validarPreenchimentoDatas(this.formulario)) {
        this.breadCrumbEnabled = false;
        this.submitBussonDisabled = true;
        this.commonService.openDialog(null, 'A data de nascimento não pode ser maior do que a data do desaparecimento', null, 'warning');
        localStorage.setItem('formIsOkay', 'false');
        return;
      }

      localStorage.setItem('formIsOkay', 'true');

      if (passoSelecionado == '3') {
        this.submitBussonDisabled = false;
      }
    }

    this.passoSelecionado = passoSelecionado;
  }

  quandoUsuarioClicarEmAvancar(event) {
    const preenchimentoDatasValido = this.validarPreenchimentoDatas(this.formulario);
    const preenchimentoIdentificacaoValido = this.validarPreenchimentoFormulario(this.formulario);

    if (!preenchimentoIdentificacaoValido) {
      this.commonService.validations = this.invalidFields;
      this.commonService.openDialog(null, null, null, 'warning');
      return;
    }
    if (!preenchimentoDatasValido) {
      this.commonService.openDialog(null, 'A data de nascimento não pode ser maior do que a data do desaparecimento', null, 'warning');
      return;
    }

    localStorage.setItem('formIsOkay', 'true');
    this.passoSelecionado = event.passoSelecionado;
  }

  validarCamposAntesDoCadastro() {
    const preenchimentoDatasValido = this.validarPreenchimentoDatas(this.formulario);
    const preenchimentoIdentificacaoValido = this.validarPreenchimentoFormulario(this.formulario);

    if (!preenchimentoIdentificacaoValido) {
      this.commonService.validations = this.invalidFields;
      this.commonService.openDialog(null, null, null, 'warning');
      return;
    }
    if (!preenchimentoDatasValido) {
      this.commonService.openDialog(null, 'A data de nascimento não pode ser maior do que a data do desaparecimento', null, 'warning');
      return;
    }
  }

  quandoUsuarioClicarEmCadastrar(evento) {
    let desaparecidoId;

    this.validarCamposAntesDoCadastro();

    this.isLoading = true;
    this.mensagemCarregandoCadastro = 'Por favor, aguarde alguns instantes.';

    this.cadastroService.cadastrarDesaparecido(this.montarModeloDeDados()).toPromise().then((message: Message) => {
      if (message.success) {

        const anexos = this.formulario.get('attachments') as FormArray;
        anexos.getRawValue().forEach(anexo => {
          this.formData.append('anexos[]', anexo.file, anexo.file.name);
        });

        desaparecidoId = message.data.id;

        this.formData.append('anexoId', message.data.id);

        this.mensagemCarregandoCadastro = 'Fazendo upload das imagens...';

        this.cadastroService.fazerUploadFotos(this.formData).toPromise().then((message: Message) => {
            this.mensagemCarregandoCadastro = 'Tudo pronto!';
            setTimeout(() => {
              this.quandoCadastroForBemSucedido(message);
            }, 1000);
          })
          .catch(err => {
            anexos.getRawValue().forEach(anexo => {
              this.formData.delete('anexos[]');
            });

            this.formData.delete('anexoId');

            this.oneSelected = false;
            this.twoSelected = false;
            this.threeSelected = false;
            this.fourSelected = false;

            const recuperabilidade = new Erro(desaparecidoId, 'recuperabilidade_upload_anexos');

            this.commonService.registrarErroParaTratarFuturamente(recuperabilidade);

            this.cadastroService.removerCadastroDesaparecido(desaparecidoId).toPromise().then((message: any) => {
              this.commonService.limparChavesErroRecuperabilidade();
            })
            .catch(err => {
              this.commonService.registrarErroParaTratarFuturamente(recuperabilidade);
            });

            this.quandoCadastroDispararErro(err);
          });
      }
    }).catch((error: any) => {
      this.quandoCadastroDispararErro(error);
    });
  }

  montarModeloDeDados() {
    const model = new DesaparecidoModel();

    model.enderecos = [];
    model.fotos = [];

    model.nome = this.formulario.get('nome').value;
    model.enderecos.push({ cidade: this.formulario.get('cidade').value, estado: this.formulario.get('estado').value.toString().toUpperCase() });
    model.dataNascimento = this.formulario.get('dataNascimento').value;
    model.dataDesaparecimento = this.formulario.get('dataDesaparecimento').value;
    model.genero = this.formulario.get('genero').value;
    model.etnia = this.formulario.get('etnia').value;
    model.altura = this.formulario.get('altura').value;
    model.peso = this.formulario.get('peso').value

    model.fotos = this.formulario.get('attachments').value;
    model.caracteristicaParticular = this.formulario.get('caracteristicaParticular').value;
    model.observacao = this.formulario.get('observacao').value;

    return model;
  }

  quandoCadastroForBemSucedido(message: Message) {
    this.isComplete = true;
    this.isLoading = false;

    this.formulario.reset();

    localStorage.setItem('temAnuncioCadastrado', 'true');

    this.oneSelected = false;
    this.twoSelected = false;
    this.threeSelected = false;
    this.fourSelected = false;

    this.commonService.openDialog(null, mensagens.legenda.anuncio_cadastrado_sucesso, '/', 'success')
  }

  quandoCadastroDispararErro(error: any) {
    this.isComplete = false;
    this.isLoading = false;
    this.commonService.onErrorResponse(error, this.loginService);
  }

  validarPreenchimentoFormulario(formulario: FormGroup) {
    this.invalidFields = [];

    for (const field in formulario.controls) {
      let status = formulario.controls[field].status;

      if (field.search("nome") > -1 && status.toLowerCase().search('invalid') > -1) {
        this.invalidFields.push('Informe o nome da pessoa');
      }

      if (field.search("cidade") > - 1 && status.toLowerCase().search('invalid') > -1) {
        this.invalidFields.push('Informe a cidade onde ela mora');
      }

      if (field.search("estado") > - 1 && status.toLowerCase().search('invalid') > -1) {
        this.invalidFields.push('Informe o estado onde ela mora');
      }
    }

    if (this.invalidFields.length > 0) {

      return false;
    }

    return true;
  }

  validarPreenchimentoDatas(formulario: FormGroup) {
    const dataNascimento = formulario.controls["dataNascimento"].value;
    const dataDesaparecimento = formulario.controls["dataDesaparecimento"].value;

    if (dataDesaparecimento && dataNascimento) {
      return (dataDesaparecimento >= dataNascimento);
    }

    return true;
  }
}
