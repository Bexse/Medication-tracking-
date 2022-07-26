import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalstateService } from '../globalStateService';
import { MedicationService } from '../medication.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  template: ` 

    <div class="col-md-6 offset-md-3 mt-5">
      <div class="card">
        <h3 class="card-header">Welcome</h3>
        <div class="card-body">
          <form [formGroup]="loginForm" (ngSubmit)="handleLogin()">
            <div class="form-group">
              <label for="email"> Email: </label>
              <input
                type="text"
                placeholder="email"
                formControlName="email"
                class="form-control"
              />
              <div *ngIf="!loginForm.get('email')?.valid">Invalid Email</div>
            </div>

            <div class="form-group">
              <label for="password"> Password: </label>
              <input
                type="password"
                placeholder="password"
                formControlName="password"
                class="form-control"
              />
              <div *ngIf="!loginForm.get('password')?.valid">
                Please Enter your password
              </div>
            </div>

          <br/>
<div>
            <button
              type="submit"
              [disabled]="!loginForm.valid"
              class="btn-btn-light"
            >
              Login
            </button>
</div>
          </form>
        </div>
      </div>
    </div>`,
  styles: [],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stateSer: GlobalstateService,
    private router: Router,
    private service: MedicationService
  ) {
    this.loginForm = fb.group({
      password: ['Test!123', Validators.required],
      email: [
        'patient1@gmail.com',
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }
  handleLogin() {
    const formValue = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.service.login(formValue).subscribe((response) => {
      const token = response.data;
      const decoded = jwt_decode(token);
      this.stateSer.gloabalState.next({ token, data: decoded });
      this.router.navigate(['']);
    });
  }
}
