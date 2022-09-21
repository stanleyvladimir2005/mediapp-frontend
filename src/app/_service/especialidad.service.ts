import { Especialidad } from '../_model/especialidad';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  //se usa entorno de variantes para evitar codigo quemado. Es equivalente a http://localhost:8080  
  url: string = `${environment.HOST}/v1/especialidades`;

  especialidadCambio = new Subject<Especialidad[]>(); //variable reactiva
  mensajeCambio = new Subject<string>(); //variable reactiva

  constructor(private http: HttpClient) { }
  /*@Autowired
  private HttpCliente http;*/ //este es el equivalente en Spring para realizar inyeccion de dependecias

  listar(){
   return this.http.get<Especialidad[]>(this.url);
  }

  //devuelve un objeto. La url se trata de forma no quemada
  listarPorID(idEspecialidad : number){
    return this.http.get<Especialidad>(`${this.url}/${idEspecialidad}`);
  }

  registar(Especialidad: Especialidad){
    return this.http.post(this.url, Especialidad);
  }

  modificar(Especialidad: Especialidad){
    return this.http.put(this.url, Especialidad);
  }

  eliminar(idEspecialidad: number){
    return this.http.delete(`${this.url}/${idEspecialidad}`); 
  }
}
