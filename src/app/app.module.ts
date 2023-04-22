import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './public/login/login.component';
import { NotFoundComponent } from './public/not-found/not-found.component';
import { RedirectComponent } from './public/redirect/redirect.component';
import {NzNotificationServiceModule} from "ng-zorro-antd/notification";
import {NzMessageServiceModule} from "ng-zorro-antd/message";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {OverlayModule} from "@angular/cdk/overlay";
import {Interceptor} from "./core/services/auth.interceptor";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_GB } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "./shared/shared.module";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {AuthGuard} from "./core/services/auth.guard";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NzNotificationServiceModule,
    NzMessageServiceModule,
    OverlayModule,
    NzFormModule,
    NzButtonModule,
    NzSpinModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
    { provide: NZ_I18N, useValue: en_GB },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
