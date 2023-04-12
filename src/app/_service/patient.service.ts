import { Patient } from '../_model/patient';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {GenericService} from "./generic.service";

@Injectable({
  providedIn: 'root'
})
export class PatientService extends GenericService<Patient> {

  patientChange = new Subject<Patient[]>;
  messageChange = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/v1/patients`
    );
  }

   listPageable(p: number, s: number){
     return this.http.get<any>(`${this.url}/pageablePatient?page=${p}&size=${s}`); //se usa any xq no es un tipo de dato de modelar. Se busca obtener en content del servicio rest
    }
}
