import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicationService } from '../medication.service';

@Component({
  selector: 'app-addmedication',
  template: `

    <div class="col-md-6 offset-md-3 mt-5">
      <div class="card">
        <h3 class="card-header">Add Medication</h3>
        <div class="card-body">
          <form [formGroup]="addMedicationFrom" (ngSubmit)="handleAdd()">
            <div class="form-group">
              <label for="medicationName"> Medication Name: </label>
              <input
                type="text"
                placeholder="Medication Name"
                formControlName="medicationName"
                class="form-control"
              />
              <div *ngIf="!addMedicationFrom.get('medicationName')?.valid">
                Please add medication name.
              </div>
            </div>

            <div class="form-group">
              <label for="note" class="form-label"> Note: </label>
              <input
                placeholder="Note"
                formControlName="note"
                class="form-control"
              />
              <div *ngIf="!addMedicationFrom.get('note')?.valid">Add note</div>
            </div>

            <div class="form-group">
              <label class="form-label" for="dosage"> Dosage: </label>
              <input
                class="form-control"
                placeholder="Dosage"
                formControlName="dosage"
              />
              <div *ngIf="!addMedicationFrom.get('dosage')?.valid">
                Add dosage
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="frequency"> Frequency: </label>
              <input
                class="form-control"
                placeholder="Frequency"
                formControlName="frequency"
              />
              <div *ngIf="!addMedicationFrom.get('frequency')?.valid">
                Please add frequency
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="refilRequest">
                Refil Request:
              </label>
              <input
                class="form-control"
                placeholder="Refil request"
                formControlName="refilRequest"
              />
              <div *ngIf="!addMedicationFrom.get('refilRequest')?.valid">
                Add refil request
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="expiryDate"> Expiry date: </label>
              <input
                class="form-control"
                placeholder="Expiry Date"
                formControlName="expiryDate"
              />
              <div *ngIf="!addMedicationFrom.get('expiryDate')?.valid">
                Add expiry date
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="sideEffects"> Side Effects </label>
              <input
                class="form-control"
                placeholder="Side Effects"
                formControlName="sideEffects"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="contraindication">
                Contraindication
              </label>
              <input
                class="form-control"
                placeholder="Contraindication"
                formControlName="contraindication"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="duration"> Duration </label>
              <input
                class="form-control"
                placeholder="Duration"
                formControlName="duration"
              />
              <div *ngIf="!addMedicationFrom.get('duration')?.valid">
                Add duration
              </div>
            </div>

            <button
              type="Submit"
              [disabled]="!addMedicationFrom.valid"
              class="btn-btn-primary"
            >
              Add Medication
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AddmedicationComponent {
  addMedicationFrom: FormGroup;

  constructor(
    private fb: FormBuilder,
    private medService: MedicationService,
    private router: Router
  ) {
    this.addMedicationFrom = fb.group({
      medicationName: ['', Validators.required],
      note: ['', Validators.required],
      dosage: ['', Validators.required],
      frequency: ['', Validators.required],
      refilRequest: ['false', Validators.required], // should be readio button for y/n
      expiryDate: ['', Validators.required],

      sideEffects: [''],
      contraindication: [''],
      duration: ['', Validators.required],
    });
  }

  handleAdd() {
    const formValue = {
      medicationName: this.addMedicationFrom.value.medicationName,
      note: this.addMedicationFrom.value.medicationName,
      dosage: this.addMedicationFrom.value.dosage,
      frequency: this.addMedicationFrom.value.frequency,
      refilRequest: this.addMedicationFrom.value.refilRequest,
      expiryDate: this.addMedicationFrom.value.expiryDate,
      sideEffects: this.addMedicationFrom.value.sideEffects,
      contraindication: this.addMedicationFrom.value.contraindication,
      duration: this.addMedicationFrom.value.duration,
    };
    console.log(formValue);
    this.medService.addMed(formValue).subscribe((response) => {
      if (response.success) {
        this.router.navigate(['/', 'medications']);
      }
    });
  }
}
