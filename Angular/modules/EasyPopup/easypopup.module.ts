import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import AngularService from './services/angular.service';
import ModalService from './services/modal.service';
import PopupService from './services/popup.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent } from './components/banner/banner.component';
import { AlertModalComponent } from './components/modal/innercomponents/alert/alert.component';
import { ConfirmationModalComponent } from './components/modal/innercomponents/confirmation/confirmation.component';
import { CustomComponentModalComponent } from './components/modal/innercomponents/customcomponent/customcomponent.component';
import { ImageModalComponent } from './components/modal/innercomponents/image/image.component';
import { ModalComponent } from './components/modal/modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { WidgetComponent } from './components/widget/widget.component';
import ToastService from './services/toast.service';
import { ToastBaseComponent } from './components/toast/toast.base.component';
import { OffcanvasComponent } from './components/offcanvas/offcanvas.component';

@NgModule({
  declarations: [
    ToastBaseComponent,
    ToastComponent,
    ModalComponent,
    AlertModalComponent,
    ConfirmationModalComponent,
    CustomComponentModalComponent,
    ImageModalComponent,
    WidgetComponent,
    BannerComponent,
    OffcanvasComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AngularService,
    PopupService,
    ModalService,
    ToastService
  ],
  exports: [
    ToastBaseComponent,
    ToastComponent,
    ModalComponent,
    AlertModalComponent,
    ConfirmationModalComponent,
    CustomComponentModalComponent,
    ImageModalComponent,
    WidgetComponent,
    BannerComponent,
    OffcanvasComponent
  ]
})
export class EasyPopupModule { }
