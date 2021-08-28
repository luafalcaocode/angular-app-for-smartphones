import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeSeusAnunciosListComponent } from './home-seus-anuncios-list/home-seus-anuncios-list.component';
import { HomeCardsComponent } from './home-cards/home-cards.component';
import { HomeSeusAnunciosDetailsComponent } from './home-seus-anuncios-details/home-seus-anuncios-details.component';

const rotas = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', component: HomeCardsComponent},
      { path: 'seus-anuncios', component: HomeSeusAnunciosListComponent },
      { path: 'seus-anuncios/detalhes/:id', component: HomeSeusAnunciosDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class HomeRoutingModule {

}
