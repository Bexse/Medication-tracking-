import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { MedicationService } from '../medication.service';

@Component({
  selector: 'app-edit',
  template: `
    <div class="col-md-6 offset-md-3 mt-5">
      <div class="card">
        <h3 class="card-header">Edit Medication Form</h3>
        <div class="card-body">
          <form [formGroup]="editMedicationFrom" (ngSubmit)="handleEdit()">
            <div class="form-group">
              <label for="medicationName"> Medication name: </label>
              <input
                type="text"
                placeholder="Medication Name"
                formControlName="medicationName"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="note" class="form-label"> Note: </label>
              <input
                placeholder="Note"
                formControlName="note"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="dosage"> Dosage: </label>
              <input
                class="form-control"
                placeholder="Dosage"
                formControlName="dosage"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="frequency"> Frequency: </label>
              <input
                class="form-control"
                placeholder="Frequency"
                formControlName="frequency"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="refilRequest">
                Refil Request:
              </label>
              <input
                class="form-control"
                placeholder="Refil Request"
                formControlName="refilRequest"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="expiryDate"> Expiry date: </label>
              <input
                class="form-control"
                placeholder="Expiry Date"
                formControlName="expiryDate"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="sideEffects"> Side Effects </label>
              <input
                class="form-control"
                placeholder="sideEffects"
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
              <label class="form-label" for="duration"> duration </label>
              <input
                class="form-control"
                placeholder="Duration"
                formControlName="duration"
              />
            </div>
            <br />
            <button type="Submit" class="btn btn-light btn-rounded me-3">
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class EditComponent {
  editMedicationFrom: FormGroup;
  constructor(
    private fb: FormBuilder,
    private medSer: MedicationService,
    private router: Router,
    private ac: ActivatedRoute
  ) {
    this.editMedicationFrom = fb.group({
      _id: [''],
      medicationName: [''],
      note: [''],
      dosage: [''],
      frequency: [''],
      refilRequest: [''], 
      expiryDate: [''],
      sideEffects: [''],
      contraindication: [''],
      duration: [''],
    });

    this.ac.paramMap
      .pipe(
        mergeMap((params) => this.medSer.listById(params.get('id') as string))
      )
      .subscribe((response) => {
        this.editMedicationFrom.get('_id')?.setValue(response.data._id);
        this.editMedicationFrom
          .get('medicationName')
          ?.setValue(response.data.medicationName);
        this.editMedicationFrom.get('note')?.setValue(response.data.note);
        this.editMedicationFrom.get('dosage')?.setValue(response.data.dosage);
        this.editMedicationFrom
          .get('frequency')
          ?.setValue(response.data.frequency);
        this.editMedicationFrom
          .get('refilRequest')
          ?.setValue(response.data.refilRequest);
        this.editMedicationFrom
          .get('expiryDate')
          ?.setValue(response.data.expiryDate);
        this.editMedicationFrom
          .get('sideEffects')
          ?.setValue(response.data.sideEffects);
        this.editMedicationFrom
          .get('contraindication')
          ?.setValue(response.data.contraindication);
        this.editMedicationFrom
          .get('duration')
          ?.setValue(response.data.duration);
      });
  }

  handleEdit() {
    const formValue = {
      medicationName: this.editMedicationFrom.value.medicationName,
      note: this.editMedicationFrom.value.note,
      dosage: this.editMedicationFrom.value.dosage,
      frequency: this.editMedicationFrom.value.frequency,
      refilRequest: this.editMedicationFrom.value.refilRequest,
      expiryDate: this.editMedicationFrom.value.expiryDate,
      sideEffects: this.editMedicationFrom.value.sideEffects,
      contraindication: this.editMedicationFrom.value.contraindication,
      duration: this.editMedicationFrom.value.duration,
    };
    this.medSer
      .edit(formValue, this.editMedicationFrom.value._id)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/', 'medications']);
        }
      });
  }
}
