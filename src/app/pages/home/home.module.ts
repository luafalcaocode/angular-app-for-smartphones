import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { HomeWelcomeComponent } from './home-welcome/home-welcome.component';
import { HomeSeusAnunciosComponent } from './home-seus-anuncios/home-seus-anuncios.component';
import { HomeSeusAnunciosListComponent } from './home-seus-anuncios-list/home-seus-anuncios-list.component';
import { HomeSeusAnunciosDetailsComponent } from './home-seus-anuncios-details/home-seus-anuncios-details.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home.routing.module';

import { HomeComponent } from './home.component';
import { HomeLocalizacaoAtualComponent } from './home-localizacao-atual/home-localizacao-atual.component';
import { HomeEstatisticasComponent } from './home-estatisticas/home-estatisticas.component';
import { HomeCardsComponent } from './home-cards/home-cards.component';



@NgModule({
  declarations: [
    HomeComponent,
    HomeLocalizacaoAtualComponent,
    HomeWelcomeComponent,
    HomeSeusAnunciosComponent,
    HomeEstatisticasComponent,
    HomeSeusAnunciosListComponent,
    HomeCardsComponent,
    HomeSeusAnunciosDetailsComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [
    HomeComponent,
    HomeLocalizacaoAtualComponent,
    HomeSeusAnunciosComponent,
    HomeSeusAnunciosListComponent,
    HomeCardsComponent,
    HomeSeusAnunciosDetailsComponent
  ]
})
export class HomeModule { }
