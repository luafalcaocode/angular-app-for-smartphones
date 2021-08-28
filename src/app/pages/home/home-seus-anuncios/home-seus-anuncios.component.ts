import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'home-seus-anuncios',
  templateUrl: './home-seus-anuncios.component.html',
  styleUrls: ['./home-seus-anuncios.component.scss']
})
export class HomeSeusAnunciosComponent implements OnInit {
  @Input() titleCard: string;
  @Input() cardType: string;
  @Input() anuncio: any;
  @Input() isLoading: boolean;
  @Input() error: boolean;

  @Output() open: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onOpen(event) {
    this.router.navigate([event]);
  }

}
