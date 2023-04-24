import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { FeaturesComponent } from './features.component';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {Interceptor} from "../core/services/auth.interceptor";
import {en_GB, NZ_I18N} from "ng-zorro-antd/i18n";
import {NzIconModule} from "ng-zorro-antd/icon";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {AuthGuard} from "../core/services/auth.guard";
import {ShortURLListComponent} from './shorturl-list/shorturl-list.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";


@NgModule({
  declarations: [
    HomeComponent,
    FeaturesComponent,
    ShortURLListComponent
  ],
    imports: [
        CommonModule,
        FeaturesRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        ClipboardModule,
        NzDropDownModule,
        NzIconModule,
        NzButtonModule,
        NzTableModule,
        NzDividerModule,
        NzDatePickerModule,
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
    { provide: NZ_I18N, useValue: en_GB },
    AuthGuard
  ],
})
export class FeaturesModule { }
