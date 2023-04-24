import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormErrorComponent} from "./components/form-error/form-error.component";
import {FormGroupComponent} from "./components/form-group/form-group.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BaseListComponent} from "./components/base.list.component";



@NgModule({
  declarations: [
    FormGroupComponent,
    FormErrorComponent,
    BaseListComponent
  ],
  exports: [
    FormGroupComponent,
    FormErrorComponent,
    BaseListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
