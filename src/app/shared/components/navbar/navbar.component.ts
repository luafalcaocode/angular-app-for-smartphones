import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { RevealWindowService } from '../reveal-window/reveal-window.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  links: string[];
  activeLink: string;

  navbarItems: any[];

  constructor(private router: Router, private loginService: LoginService, private revealService: RevealWindowService) {
    this.links = [
      'teste1',
      'teste2'
    ];

    this.navbarItems = [
      {
        iconCode: 'home',
        title: 'Home',
        titleClass: 'home',
        tabContent: 'Tela Home',
        link: '',
        padding: '30px'
      },
      {
        iconCode: 'supervised_user_circle',
        title: 'Catálogo',
        titleClass: 'catalogo',
        tabContent: 'Tela Catálogo',
        link: '/catalogo',
        padding: '20px'
      },
      {
        iconCode: 'add_circle',
        title: 'Cadastro',
        titleClass: 'cadastro',
        tabContent: 'Tela Cadastro',
        link: 'cadastro',
        padding: '20px'
      },
      {
        iconCode: 'notifications',
        title: 'Alertas',
        titleClass: 'configuracoes',
        tabContent: 'Tela Configurações',
        link: 'configuracoes',
        padding: '25px'
      }
    ]

  }

  ngOnInit(): void {

  }

  openPage(pageUrl: string) {
    if (pageUrl.includes('cadastro')) {            
      const estaLogado = this.loginService.getUsuarioEstaLogado();
      if (estaLogado) {
        this.router.navigate([pageUrl]);
      }
      else {        
        this.revealService.init(estaLogado);
        this.revealService.open();
      }

      return;
    }

    this.router.navigate([pageUrl]);
  }

}
