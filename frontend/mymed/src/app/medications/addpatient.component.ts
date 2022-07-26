import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addpatient',
  template: `
    <p>addpatient works!</p>
    <div class="col-md-6 offset-md-3 mt-5">
      <div class="card">
        <h3 class="card-header">Welcome</h3>
        <div class="card-body">
          <form [formGroup]="patientRegForm" (ngSubmit)="handleRegistration()">
            <div class="form-group">
              <label for="firstName" class="form-label"> first Name </label>

              <input
                placeholder="firstName"
                class="form-control"
                formControlName="firstName"
              />
              <div *ngIf="!patientRegForm.get('firstName')?.valid">
                Add first Name
              </div>
            </div>

            <div class="form-group">
              <label for="lastName" class="form-label"> last Name </label>

              <input
                placeholder="emalastNameil"
                class="form-control"
                formControlName="lastName"
              />
              <div *ngIf="!patientRegForm.get('lastName')?.valid">
              Add last name
              </div>
            </div>
            <div class="form-group">
              <label for="email"> Email: </label>
              <input
                type="text"
                placeholder="email"
                formControlName="email"
                class="form-control"
              />
              <div *ngIf="!patientRegForm.get('email')?.valid">
                Invalid Email
              </div>
            </div>

           
            <div class="form-group">
              <label for="phone" class="form-label"> phone </label>

              <input
                placeholder="phone"
                class="form-control"
                formControlName="phone"
              />
              <div *ngIf="!patientRegForm.get('phone')?.valid">
                 Phone is required.
              </div>
            </div>
            <button
              type="submit"
              [disabled]="!patientRegForm.valid"
              class="btn-btn-primary"
            >
              Register Patient
            </button>
          </form>
        </div>
      </div>
    </div>
    ,
  `,

  styles: [],
})
export class AddpatientComponent {
  patientRegForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.patientRegForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  handleRegistration() {
    const formValue = {
      firstName: this.patientRegForm.value,
      lastName: this.patientRegForm.value,
      role: this.patientRegForm.value,
      email: this.patientRegForm.value,
      phone: this.patientRegForm.value,
    };
  }
}
