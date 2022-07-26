import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicationService } from './medication.service';


@Component({
  selector: 'app-signup',
  template: `
    <div class="col-md-6 offset-md-3 mt-5">
      <div class="card">
        <h3 class="card-header">Sign Up</h3>
        <div class="card-body">
          <form [formGroup]="singupForm" (ngSubmit)="handleSubmit()">
            <div class="form-group">
              <label for="firstName" class="form-label"> First Name: </label>

              <input
                placeholder="First Name"
                class="form-control"
                formControlName="firstName"
              />
              <div *ngIf="!singupForm.get('firstName')?.valid">
                First name is required.
              </div>
            </div>

            <div class="form-group">
              <label for="lastName" class="form-label"> Last Name </label>

              <input
                placeholder="Last Name"
                class="form-control"
                formControlName="lastName"
              />
              <div *ngIf="!singupForm.get('lastName')?.valid">
                Last name is required.
              </div>
            </div>

            <div class="form-group">
              <label for="role" class="form-label"> Role: </label>
              <input
                placeholder="Role"
                class="form-control"
                formControlName="role"
              />
              <div *ngIf="!singupForm.get('role')?.valid">
                Please Enter your role
              </div>
            </div>
            <div class="form-group">
              <label for="email" class="form-label"> Email </label>

              <input
                placeholder="email"
                class="form-control"
                formControlName="email"
              />
              <div *ngIf="!singupForm.get('email')?.valid">Invalid Email</div>
            </div>

            <div class="form-group">
              <label for="password" class="form-label"> Password: </label>
              <input
                placeholder="password"
                class="form-control"
                formControlName="password"
              />
              <div *ngIf="!singupForm.get('password')?.valid">
                Please Enter your password
              </div>
            </div>

            <div class="form-group">
              <label for="phone" class="form-label"> phone </label>

              <input
                placeholder="Phone"
                class="form-control"
                formControlName="phone"
              />
              <div *ngIf="!singupForm.get('phone')?.valid"> Phone is required</div>
            </div>
            <button
              type="Submit"
              class="btn-btn-primary"
              [disabled]="!singupForm.valid"
            >
              Sign UP
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SignupComponent {
  singupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: MedicationService
  ) {
    this.singupForm = fb.group({
      role: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
  handleSubmit() {
    const formValue = {
      role: this.singupForm.value.role,
      email: this.singupForm.value.email,
      password: this.singupForm.value.password,
      firstName: this.singupForm.value.firstName,
      lastName: this.singupForm.value.lastName,
      phone: this.singupForm.value.phone,
    };
    this.service.signUp(formValue).subscribe((response) => {
      if (response.success) {
        this.router.navigate(['/', 'login']);
      }
    });
  }
}
