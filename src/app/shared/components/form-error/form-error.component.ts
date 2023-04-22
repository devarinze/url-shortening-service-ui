import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, AbstractControlDirective} from '@angular/forms';

@Component({
  selector: 'app-form-error',
  template: `
      <div style="font-size: 0.7rem" class="mt-2 text-red-600" *ngIf="shouldShowErrors()"> {{getError()}}</div>
  `,
  styles: []
})
export class FormErrorComponent implements OnInit {

  static readonly errorMessages = {
    required: (params) => '##FIELD## is required *',
    minlength: (params) => '##FIELD## should be minimum ' + params.requiredLength + ' characters',
    maxlength: (params) => '##FIELD## should not be greater than ' + params.requiredLength + ' characters',
    pattern: (params) => 'Should be valid',
    email: (params) => 'Invalid email *',
    vaildEmail: (params) => 'Invalid email',
    specialCharacter: (params) => 'No Special Characters are Allowed *',
    startsWith: (params) => '##FIELD## must start with ' + params.value,
    numberOnly: (params) => 'Only Numbers are allowed *',
    letterOnly: (params) => 'Only Letters are allowed *',
    min: (params) => '##FIELD## minimum character is ' + params.minValue,
    max: (params) => '##FIELD## maximum character is ' + params.maxValue,
    minDate: (params) => 'Date must be after the selected date',
    maxDate: (params) => 'Date must be before the selected date ',
    shouldBe: (params) => '##FIELD## must be ' + params.num + ' characters',
    shouldBeEqual: (params) => 'Confirm password must match password',
    confirmPassword: (params) => 'Passwords must match *',
    alphaDash: (params) => 'Enter valid name *',
    customMessage: (params) => params.value
  };

  formNames = {};

  @Input()
  control: AbstractControlDirective | AbstractControl;
  @Input()
  label: string;

  ngOnInit() {
  }

  shouldShowErrors(): boolean {
    return this.control && this.control.errors && (this.control.dirty || this.control.touched);
  }

  getError(): string {
    // console.log(this.control.errors);
    const errors = Object.keys(this.control.errors).map(field => this.getMessage(field, this.control.errors[field], this.control));
    return errors[0];
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }

  private getMessage(type: string, params: any, control: any) {
    let fname = this.getControlName(control);
    for (const init in this.formNames) {
      if (fname === init) {
        fname = this.formNames[fname];
      } else {
        fname = fname;
      }
    }

    // console.log(fname, ' me ', type, ' gty ', params);
    const msg = FormErrorComponent.errorMessages[type](params);
    let fieldName = fname.replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase());
    // this.translateService.get(this.label).subscribe((data) => {
    //   // console.log(data);
    // });
    fieldName = this.label ? this.label : fieldName;
    return msg.replace('##FIELD##', fieldName);
  }
}
