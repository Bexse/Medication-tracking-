import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from './config';
import { Medication } from './Medication';
import { User } from './user';
@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<{ success: boolean; data: Array<Medication> }>(
      `${config.server}/api/medications`
    );
  }
  listById(id: string) {
    return this.http.get<{ success: boolean; data: Medication }>(
      `${config.server}/api/medications/${id}`
    );
  }
  addMed(medication: Medication) {
    return this.http.post<{ success: boolean; data: Medication }>(
      `${config.server}/api/medications/add`,
      medication
    );
  }

  addMedToApatient(medication: Medication, id: any) {
    return this.http.post<{ success: boolean; data: Medication }>(
      `${config.server}/api/medications/addto/${id}`,
      medication
    );
  }

  edit(medication: Medication, id: string) {
    return this.http.put<{ success: boolean; data: Medication }>(
      `${config.server}/api/medications/${id}`,
      medication
    );
  }

  reillUpdate(refilRequest: any, id: string) {
    return this.http.put<{ success: boolean; data: Medication }>(
      `${config.server}/api/medications/request/${id}`,
      refilRequest
    );
  }

  deleteById(id: string) {
    return this.http.delete<{ success: Boolean; data: Medication }>(
      `${config.server}/api/medications/${id}`
    );
  }

  login(obj: any) {
    return this.http.post<{ success: boolean; data: any }>(
      `${config.server}/api/users/login`,
      obj
    );
  }

  signUp(obj: User) {
    return this.http.post<{ success: boolean; data: any }>(
      `${config.server}/api/users/signUp`,
      obj
    );
  }

  allPatients() {
    return this.http.get<{ success: boolean; data: Array<User> }>(
      `${config.server}/api/users/patients/?role=patient`
    );
  }
  getMedsForApatient(id: string) {
    return this.http.get<{ success: boolean; data: Array<Medication> }>(
      `${config.server}/api/users/${id}`
    );
  }
}
