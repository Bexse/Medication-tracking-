import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { MedicationService } from '../medication.service';
@Component({
  selector: 'app-refilrequest',
  template: `
    <div class="col-md-6 offset-md-3 mt-5">
      <div class="card">
        <h3 class="card-header">Refill Request form</h3>
        <div class="card-body">
          <form [formGroup]="refillRequestFrom" (ngSubmit)="handleRequest()">
            <div class="form-group">
              <label class="form-label" for="refilRequest">
                Request Refill:
              </label>
              <input
                class="form-control"
                placeholder="True or False"
                formControlName="refilRequest"
              />
            </div>

            <button
              type="Submit"
              class="btn-btn-light btn-rounded mt-2"
              [disabled]="!refillRequestFrom.valid"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class RefilrequestComponent {
  refillRequestFrom: FormGroup;
  constructor(
    private fb: FormBuilder,
    private medSer: MedicationService,
    private router: Router,
    private ac: ActivatedRoute
  ) {
    this.refillRequestFrom = fb.group({
      _id: [''],
      refilRequest: ['', Validators.required],
    });
    this.ac.paramMap
      .pipe(
        mergeMap((params) => this.medSer.listById(params.get('id') as string))
      )
      .subscribe((response) => {
        this.refillRequestFrom.get('_id')?.setValue(response.data._id);
        this.refillRequestFrom
          .get('refilRequest')
          ?.setValue(response.data.refilRequest);
      });
  }

  handleRequest() {
    const formValue = {
      refilRequest: this.refillRequestFrom.value.refilRequest,
    };
    this.medSer
      .reillUpdate(formValue, this.refillRequestFrom.value._id)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/', 'medications']);
        }
      });
  }
}
