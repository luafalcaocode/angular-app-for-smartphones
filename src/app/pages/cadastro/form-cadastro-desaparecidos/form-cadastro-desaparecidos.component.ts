import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalInputComponent } from '../../../shared/components/modal-input/modal-input.component';
import { mensagens } from '../../../constants/mensagens.const';
import { CommonService } from '../../../shared/services/common.service';
import { IMAGE_EXTENSIONS } from '../../../shared/constants/extensions';

@Component({
  selector: 'app-form-cadastro-desaparecidos',
  templateUrl: './form-cadastro-desaparecidos.component.html',
  styleUrls: ['./form-cadastro-desaparecidos.component.scss']
})
export class FormCadastroDesaparecidosComponent implements OnInit {
  @Input() passoSelecionadoNaBreadcrumb;
  @Input() isSubmitButtonDisabled: boolean;

  @Input() formulario: FormGroup;
  attachments: FormArray;
  anexos: any[];

  @Input() isLoading: boolean;
  @Input() isSubmitted: boolean;

  @Input() oneSelected: any;
  @Input() twoSelected: any;
  @Input() threeSelected: any;
  @Input() fourSelected: any

  @Output() onSubmitEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onInvalidStepEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickNextEvent: EventEmitter<any> = new EventEmitter<any>();

  fieldName: string;
  isGeneroSelected: boolean;
  isEtniaSelected: boolean;
  etniaSelectedField: string;
  generoSelectedField: string;
  fileSelected: boolean;

  idSelected: any;

  whatWasSelected: any;

  clearPhotoOne: boolean;

  alturaBinding: any = 0;
  pesoBinding: any = 0;

  isCardVisible: boolean;

  invalidFields: string[];
  dialogRef: any;



  constructor(private formBuilder: FormBuilder, private commonService: CommonService) {

  }


  ngOnInit(): void {
    this.anexos = [];
  }

  ngDoCheck() {
    if (this.isSubmitted) {
      for (let index = 0; index < 3; index++) {
        this.unSelecteFile(`attachment_${index}`);
      }
      this.isSubmitted = false;
    }
  }

  checkValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  applyCssError(campo) {
    return {
      'has-error': this.checkValidTouched(campo),
      'has-feedback': this.checkValidTouched(campo)
    }
  }

  onSubmit() {
    const anexos: any = this.formulario.get('attachments');
    if (anexos.length <= 0) {
      this.invalidFields = [];
      this.commonService.openDialog(null, mensagens.legenda.envie_uma_foto, null, 'warning');
      return;
    }

    this.onSubmitEvent.emit({ anexos: this.anexos });
  }

  quandoClicarEmAvancar(passoSeguinte) {
    this.onClickNextEvent.emit({ passoSelecionado: passoSeguinte, formulario: this.formulario});
    window.scrollTo(0, 0);
  }



  onSelecionarDataNascimento(event) {
    this.formulario.patchValue({
      dataNascimento: event.value
    });
  }

  onSelecionarDataDesaparecimento(event) {
    this.formulario.patchValue({
      dataDesaparecimento: event.value
    });
  }

  createAttachment(obj?: any): FormGroup {
    return this.formBuilder.group({
      name: obj != null ? obj.name : '',
      file: obj != null ? obj.file : ''
    });
  }

  setAttachment(obj: any) {
    this.attachments = this.formulario.get('attachments') as FormArray;
    this.attachments.push(this.createAttachment(obj));
  }

  removeAttachment(attachmentId) {
    let index = 0;
    for (const item of this.attachments.controls) {
      if (item.value.name == attachmentId) {
        this.attachments.removeAt(index);
        this.unSelecteFile(attachmentId);
        break;
      }

      index++;
    }
  }

  unSelecteFile(attachmentId) {
    switch (attachmentId) {
      case 'attachment_1':
        this.oneSelected = false;
        break;
      case 'attachment_2':
        this.twoSelected = false;
        break;
      case 'attachment_3':
        this.threeSelected = false;
        break;
      case 'attachment_4':
        this.fourSelected = false;
        break;
    }
  }

  setActiveClass(field) {
    switch (field) {
      case 'genero':

        break;
    }
  }

  setGenero(value) {
    this.formulario.patchValue({
      genero: value
    });

    this.generoSelectedField = value;
  }


  setEtnia(value) {
    this.formulario.patchValue({
      etnia: value
    });

    this.etniaSelectedField = value;
  }

  onLimparDataNascimento(event) {
    this.formulario.patchValue({
      dataNascimento: null
    });
  }

  onLimparDataDesaparecimento(event) {
    this.formulario.patchValue({
      dataDesaparecimento: null
    });
  }

  onAttachmentSelected(event) {
    if (event.foiSelecionado) {
      this.fileSelected = true;
      switch (event.id) {
        case 'attachment_1':
          this.oneSelected = true;
          break;
        case 'attachment_2':
          this.twoSelected = true;
          break;
        case 'attachment_3':
          this.threeSelected = true;
          break;
        case 'attachment_4':
          this.fourSelected = true;
          break;
      }

      this.setAttachment({
        name: event.id,
        file: event.file
      });

      this.idSelected = event.id;
    }
    else {
      this.commonService.openDialog(null, mensagens.legenda.anexo_invalido + ' ' + IMAGE_EXTENSIONS.join(', ') + '.', null, 'error');
    }
  }

  onClearPhoto(id) {
    document.getElementById(id).style.display = 'none';
  }

  onHide() {
    this.isCardVisible = !this.isCardVisible;
  }

  onFocusCampoFormulario(event: any) {
    const bar = (<HTMLElement>document.querySelector('#reencontreNavbar'));

    bar.style.display = 'none';
  //  bar.style.opacity = '0';
    bar.style.pointerEvents = 'none';

    const breadcrumb = (<HTMLElement>document.querySelector('#breadCrumbContainer'));
    breadcrumb.style.top = '0px';

    const breadCrumbCloseIcon = (<HTMLElement>document.querySelector('.button-close'));
    breadCrumbCloseIcon.style.opacity = '1';
  }

  onBlurCampoFormulario(event: any) {
    const bar = (<HTMLElement>document.querySelector('#reencontreNavbar'));

    bar.style.display = 'block';
    //bar.style.opacity = '1';
    bar.style.pointerEvents = 'auto';
  }
}
