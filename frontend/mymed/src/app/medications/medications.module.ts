import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { AddmedicationComponent } from './addmedication.component';
import { ListComponent } from './list.component';
import { RefilrequestComponent } from './refilrequest.component';
import { AddpatientComponent } from './addpatient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchPipe } from './search.pipe';
import { RefilldatePipe } from './refilldate.pipe';
import { AddpatientmedComponent } from './addpatientmed.component';

@NgModule({
  declarations: [
    EditComponent,
    AddmedicationComponent,
    ListComponent,
    RefilrequestComponent,
    AddpatientComponent,
    SearchPipe,
    RefilldatePipe,
    AddpatientmedComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ListComponent },
      { path: 'add', component: AddmedicationComponent },
      { path: 'addto/:id', component: AddpatientmedComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'request/:id', component: RefilrequestComponent },
    ]),
  ],
})
export class MedicationsModule {}
