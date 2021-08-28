import { Component, OnInit, Input } from '@angular/core';

import { LoginService } from '../../../shared/services/login.service';

import { HomeService } from '../home.service';


import { Message } from '../../../shared/utils/message';
import { CommonService } from '../../../shared/services/common.service';
import { ApiService } from '../../../shared/services/api.service';


@Component({
  selector: 'home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss']
})
export class HomeCardsComponent implements OnInit {
  usuarioEstaLogado: boolean;
  anuncio: any = {};
  isLoading: boolean;
  public error: boolean;

  constructor(private loginService: LoginService,
    private homeService: HomeService,
    private apiService: ApiService,
    private commonService: CommonService) { }


  ngOnInit(): void {
    this.inicializar();
  }

  ngDoCheck() {
    this.usuarioEstaLogado = this.loginService.getUsuarioEstaLogado();
    const fezLogin = localStorage.getItem('fezLogin');
    if (this.usuarioEstaLogado && fezLogin) {
      this.inicializar();
      localStorage.removeItem('fezLogin');
    }
  }

  inicializar() {
    this.usuarioEstaLogado = this.loginService.getUsuarioEstaLogado();
    if (this.usuarioEstaLogado) {
      this.isLoading = true;
      this.homeService.initialize(this)
        .toPromise()
        .then((message: Message) => {
          this.anuncio.quantidade = message.data;
          this.anuncio.subtitulo = "Anúncios";
          localStorage.setItem('quantidadeItensCadastrados', this.anuncio.quantidade);
          window.scrollTo(0, 0);
        })
        .catch(err => {
          this.error = true;
          this.anuncio = {};
          //  this.commonService.onErrorResponse(err, null, true);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }

    this.homeService.obterQuantidadeItensDoCatalogo()
    .toPromise()
    .then((message: Message) => {
        localStorage.setItem('quantidadeItensNoCatalogo', message.data);
    });

  }
}
