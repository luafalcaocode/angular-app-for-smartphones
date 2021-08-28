import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';


import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { RevealWindowComponent } from './components/reveal-window/reveal-window.component';
import { FormDebugComponent } from './components/form-debug/form-debug.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { MiniLoadingComponent } from './components/mini-loading/mini-loading.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AttachmentComponent } from './components/attachment/attachment.component';
import { ModalInputComponent } from './components/modal-input/modal-input.component';
import { FullLoadingComponent } from './components/full-loading/full-loading.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { FormLogoutComponent } from './components/form-logout/form-logout.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { SimpleCarouselComponent } from './components/simple-carousel/simple-carousel.component';

import {IvyCarouselModule} from 'angular-responsive-carousel';
import { SimpleListComponent } from './components/simple-list/simple-list.component';

import {MatListModule} from '@angular/material/list';
import { FormCadastroComponent } from './components/form-cadastro/form-cadastro.component';
import { FormVerificationCodeComponent } from './components/form-verification-code/form-verification-code.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatListModule,
    IvyCarouselModule
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    CardComponent,
    RevealWindowComponent,
    FormDebugComponent,
    FormLoginComponent,
    BreadcrumbComponent,
    CalendarComponent,
    AttachmentComponent,
    FullLoadingComponent,
    ModalInputComponent,
    MiniLoadingComponent,
    LightboxComponent,
    FormLogoutComponent,
    FormCadastroComponent,
    FormVerificationCodeComponent,
    SearchBarComponent,
    ErrorMessageComponent,
    SimpleCarouselComponent,
    SimpleListComponent
  ],
  declarations: [
    NavbarComponent,
    HeaderComponent,
    CardComponent,
    RevealWindowComponent,
    FormDebugComponent,
    FormLoginComponent,
    MiniLoadingComponent,
    BreadcrumbComponent,
    CalendarComponent,
    AttachmentComponent,
    ModalInputComponent,
    FullLoadingComponent,
    LightboxComponent,
    FormLogoutComponent,
    SearchBarComponent,
    ErrorMessageComponent,
    SimpleCarouselComponent,
    SimpleListComponent,
    FormCadastroComponent,
    FormVerificationCodeComponent]
})
export class SharedModule { }
