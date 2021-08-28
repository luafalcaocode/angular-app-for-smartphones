import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import EventEmitter from 'events';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  isLoading: boolean;

  @ViewChild("email") email: ElementRef;
  @ViewChild("password") senha: ElementRef;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.isLoading = this.loginService.isLoading;
  }

  onSubmitLogin(loginForm) {
    this.loginService.login(loginForm);
  
    this.email.nativeElement.blur();
    this.senha.nativeElement.blur();
  }

  onSelecionarNavegacao(tela, titulo) {
    localStorage.setItem('revealContent', tela);
    localStorage.setItem('revealTitle', titulo);
  }
}
