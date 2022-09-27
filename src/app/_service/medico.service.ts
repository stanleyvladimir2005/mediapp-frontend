import { Medico } from '../_model/medico';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {GenericService} from "./generic.service";

@Injectable({
  providedIn: 'root'
})
export class MedicoService extends GenericService<Medico> {

    medicoCambio = new Subject<Medico[]>(); //variable reactiva
    mensajeCambio = new Subject<string>(); //variable reactiva

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/v1/medicos`
    );
  }
}
