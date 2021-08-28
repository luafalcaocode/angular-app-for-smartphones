import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from './home.service';


import { Message } from '../../shared/utils/message';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usuarioEstaLogado: boolean;
  @Input() anuncio: any;

  constructor(private homeService: HomeService, private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {    
    
    
  }

  open(link) {
    this.router.navigate([link]);
  }
}
