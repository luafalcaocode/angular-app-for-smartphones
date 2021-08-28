import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { CatalogoComponent } from './catalogo.component';
import { CatalogoListComponent } from './catalogo-list/catalogo-list.component';
import { CatalogoDetailsComponent } from './catalogo-details/catalogo-details.component';
import { HomeCardsComponent } from '../home/home-cards/home-cards.component';

const rotas = [
  {
    path: 'catalogo', component: CatalogoComponent, children: [
      { path: '', component: CatalogoListComponent },
      { path: 'detalhes/:id', component: CatalogoDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class CatalogoRoutingModule {





}

