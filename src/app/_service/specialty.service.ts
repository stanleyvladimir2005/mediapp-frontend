import { Specialty } from '../_model/specialty';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {GenericService} from "./generic.service";

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService extends GenericService<Specialty> {

  specialtyChange = new Subject<Specialty[]>(); //variable reactiva
  messageChange = new Subject<string>(); //variable reactiva

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/v1/specialtys`
    );
  }
}
