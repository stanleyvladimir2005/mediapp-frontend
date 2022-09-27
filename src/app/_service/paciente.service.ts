import { Paciente } from '../_model/paciente';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {GenericService} from "./generic.service";

@Injectable({
  providedIn: 'root'
})
export class PacienteService extends GenericService<Paciente> {

  pacienteCambio = new Subject<Paciente[]>;
  mensajeCambio = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/v1/pacientes`
    );
  }

   listarPageable(p: number, s: number){
     return this.http.get<any>(`${this.url}/pageablePaciente?page=${p}&size=${s}`); //se usa any xq no es un tipo de dato de modelar. Se busca obtener en content del servicio rest
    }
}
