import {Medic} from '../_model/medic';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {GenericService} from "./generic.service";

@Injectable({
  providedIn: 'root'
})
export class MedicService extends GenericService<Medic> {

    medicChange = new Subject<Medic[]>(); //variable reactiva
    messageChange = new Subject<string>(); //variable reactiva

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/v1/medics`
    );
  }
}
