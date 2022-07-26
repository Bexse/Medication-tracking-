import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { SearchPipe } from './search.pipe';
import { MedicationService } from '../medication.service';
import { NgModule } from '@angular/core';
import { GlobalstateService } from '../globalStateService';
import { Medication } from '../Medication';
@Component({
  selector: 'app-list',
  template: `
    <div class="container pt-5">
      <h4>Here are your list of medications </h4>
      <div class="d-grid gap-2 d-md-flex mb-2 justify-content-md-end">
        <button class="btn btn-primary me-md-2" (click)="handleAdd()">
          Add your medication/s
        </button>
        <br />
      </div>
      <div class="form-outline mb-4">
        <input
          type="search"
          class="form-control"
          [(ngModel)]="search"
          placeholder="Search Medications "
        />
      </div>
      <div class="row mb-2">
        <div class="col-sm">
          <div
            class="card bg-light mb-3"
            *ngFor="let list of lists | search: search"
          >
            <div class="card-body">
              <h4 class="card-title text-info">
                Medication Name: {{ list.medicationName }}
              </h4>
              <p class="card-text">Note: {{ list.note }}</p>
              <p class="card-text">Dosage: {{ list.dosage }}</p>
              <p class="card-text">Dose frequency: {{ list.frequency }}</p>
              <h4 *ngIf="list.refilRequest" style="color: green">
                Refill requested!
              </h4>
              <p
                class="card-text"
                [ngStyle]="{
                  backgroundColor:
                    list.expiryDate < list.createdAt ? 'red' : 'none'
                }"
              >
                Medication expiration date: {{ list.expiryDate | date }}
              </p>
              <p class="card-text">
                Contraindication: {{ list.contraindication }}
              </p>
              <p class="card-text">Side Effects: {{ list.sideEffects }}</p>
              <p class="card-text" style="color: green">
                Duration of Medication is for {{ list.duration }} days and
                refill your Medication on
                {{ list.duration | refilldate: today | date }}.
              </p>
              <button
                type="button"
                class="btn btn-light btn-rounded me-2"
                [routerLink]="['/', 'medications', 'edit', list._id]"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-light btn-rounded me-2"
                (click)="handleDelete(list._id)"
              >
                Delete
              </button>
              <button
                type="button"
                class="btn btn-light btn-rounded me-2"
                [routerLink]="['/', 'medications', 'request', list._id]"
              >
                Request refill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class ListComponent implements OnInit {
  lists: any = [];
  search: any = '';
  today: Date = new Date();

  constructor(
    private route: Router,
    private service: GlobalstateService,
    private medService: MedicationService
  ) {}

  ngOnInit(): void {
    this.medService.list().subscribe((response) => {
      this.lists = response.data;
    });
  }

  handleAdd() {
    this.route.navigate(['/medications/add']);
  }

  findIndex(id: string) {
    let index = 1;
    for (let i = 0; i < this.lists.length; i++) {
      if (this.lists[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  handleDelete(id: string) {
    // //tricky make sure it deletes only one.
    // this.medService.deleteById(id).subscribe((response)=>{
    //   //  let index = this.findIndex(id);
    //   //  this.lists.splice(index,1);
    // //  if (response.success){
    //    this.lists.filter((med: any) => med.id!== id);
    // //  }
    //})
  }
}
