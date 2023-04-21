import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormErrorComponent} from "./components/form-error/form-error.component";
import {FormGroupComponent} from "./components/form-group/form-group.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    FormGroupComponent,
    FormErrorComponent,
  ],
  exports: [
    FormGroupComponent,
    FormErrorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
