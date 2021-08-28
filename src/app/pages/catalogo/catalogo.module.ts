import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CatalogoRoutingModule } from './catalogo.routing.module';
import { SharedModule } from '../../shared/shared.module';


import { CatalogoComponent } from './catalogo.component';
import { CatalogoListComponent } from './catalogo-list/catalogo-list.component';
import { CatalogoDetailsComponent } from './catalogo-details/catalogo-details.component';


@NgModule({
  declarations: [
    CatalogoComponent,
    CatalogoListComponent,
    CatalogoDetailsComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    CatalogoRoutingModule
  ],
  exports: [
    CatalogoComponent,
    CatalogoListComponent,
    CatalogoDetailsComponent
  ]
})
export class CatalogoModule { }
