import { Especialidad } from '../_model/especialidad';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {GenericService} from "./generic.service";

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService extends GenericService<Especialidad> {

  especialidadCambio = new Subject<Especialidad[]>(); //variable reactiva
  mensajeCambio = new Subject<string>(); //variable reactiva

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/v1/especialidades`
    );
  }
}
