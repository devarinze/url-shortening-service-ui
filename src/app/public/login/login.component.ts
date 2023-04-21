import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;
  signUpForm: FormGroup;
  busy = false;
  isLogin = true;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.logInForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.maxLength(25)]],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.signUpForm.addValidators(this.passwordMatchingValidator);
  }

  passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      if (confirmPassword.errors && !confirmPassword.errors['customMessage']) {
        return null;
      }
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ customMessage: {value: 'Password does not match'} });
        return { confirmedValidator: true };
      } else {
        confirmPassword.setErrors(null);
        return null;
      }
  }

  logIn() {
    this.authService.clearAuth();
    this.busy = true;
    this.authService.login(this.logInForm.value).pipe(untilDestroyed(this)).subscribe(data => {
      this.busy = false;
      this.authService.loginResponse(data.payload);
    }, error => this.busy = false);
  }

  signUp() {
    this.authService.clearAuth();
    this.busy = true;
    this.authService.signup(this.signUpForm.value).pipe(untilDestroyed(this)).subscribe(data => {
      this.busy = false;
      this.authService.loginResponse(data.payload);
    }, error => this.busy = false);
  }

  switchForms() {
    this.isLogin = !this.isLogin;
    this.initForms();
  }

  ngOnDestroy(): void {
  }
}
