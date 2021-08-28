import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { mensagens } from '../../../constants/mensagens.const';
import { CommonService } from '../../services/common.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() type: string;
  @Input() content: any;
  @Input() anuncio: any;
  @Input() isLoading: boolean;
  @Input() hasError: boolean;


  cardImageIsVisible: boolean;
  alreadyCheckIsAuthenticated: boolean;

  src: any;

  @Output() onOpenCardEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('cardImage') image;

  constructor(private element: ElementRef, private commonService: CommonService, private loginService: LoginService) { }

  ngAfterViewInit(): void {
    if (this.image) {
      this.image.nativeElement.onload = () => {
        this.cardImageIsVisible = true;
      };
    }
  }


  ngOnInit() {

  }

  ngOnChanges() {
  }

  onOpenCard(type) {

    let route = '';

    switch (type) {
      case 'info':
        route = '/home/seus-anuncios';
        break;
      case 'add':
        route = '/cadastro'
        break;
      case 'anuncio':
        route = this.anuncio.url;
    }

    if (route) {
      this.onOpenCardEvent.emit(route);
    }
  }
}
