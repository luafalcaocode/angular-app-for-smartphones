import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormCadastroDesaparecidosComponent } from '../../../pages/cadastro/form-cadastro-desaparecidos/form-cadastro-desaparecidos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.scss']
})
export class ModalInputComponent implements OnInit {
  public modalType: string;
  

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

  ngOnInit(): void {
    this.modalType = this.data.modalType;
  }

  closeDialog() {
    this.dialogRef.close();
    if (this.data.url) {
      this.router.navigate([this.data.url]);
    }
  }
}
