import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { MedicationService } from './medication.service';
import { Medication } from './Medication';

@Component({
  selector: 'app-patients',
  template: `
  <div class ='container'> 
    <h4 class= 'ms-4'>Patients profile</h4>
    <div class="card bg-light mb-3" *ngFor="let patient of patients">
      <div class="card-body">
        <h4 class="card-title text-info">
          Patient full name: {{ patient.firstName }} {{ patient.lastName }}
        </h4>
        <p class="card-text">Email: {{ patient.email }}</p>
        <p class="card-text">Phone: {{ patient.phone }}</p>

        <button
          type="button"
          class="btn btn-light btn-rounded me-2"
          (click)="details(patient._id)"
        >
          Details
        </button>

        <button
          class="btn btn-light btn-rounded me-2"
          [routerLink]="['/', 'medications', 'addto', patient._id]"
        >
          Prescribe new Med
        </button>
      </div>
    </div>
    <div class="card bg-light mb-3" *ngFor="let med of medications">
      <div class="card-body">
        <h4 class="card-title text-info">
          Medication Name: {{ med.medicationName }}
        </h4>
        <p>Dosage: {{ med.dosage }}</p>
        <p>Contraindication: {{ med.contraindication }}</p>
        <p>Side effects: {{ med.sideEffects }}</p>
        <p>Dose frequency: {{ med.frequency }}</p>
        <h4 *ngIf="med.refilRequest" style="color: red">Refill requested!</h4>
        <p>Duration: {{ med.duration }} days</p>
      </div>
    </div>
  `,
  styles: [],
})
export class PatientsComponent implements OnInit {
  patients: any = [];
  medications: Array<Medication> = [];
  id: string = '';
  prescribedMed: string = '';
  constructor(private medSer: MedicationService, private route: Router) {}

  ngOnInit(): void {
    this.medSer.allPatients().subscribe((response) => {
      this.patients = response.data;
      for (let item of this.patients) {
        this.id = item._id;
      }
    });
  }

  details(id: string) {
    this.medSer.getMedsForApatient(id).subscribe((response) => {
      this.medications = response.data;
    });
  }
  // i have to send the id of the patient.
  add(id: string) {
    this.route.navigate(['patients/addto/:id']);
  }
}
