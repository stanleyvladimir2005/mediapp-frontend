import { Examen } from '../_model/examen';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  //se usa entorno de variantes para evitar codigo quemado. Es equivalente a http://localhost:8080  
  url: string = `${environment.HOST}/v1/examenes`;

  examenCambio = new Subject<Examen[]>(); //variable reactiva
  mensajeCambio = new Subject<string>(); //variable reactiva

  constructor(private http: HttpClient) { }

  /*@Autowired
  private HttpCliente http;*/ //este es el equivalente en Spring para realizar inyeccion de dependecias

  listar(){
   return this.http.get<Examen[]>(this.url);
  }

  //devuelve un objeto. La url se trata de forma no quemada
  listarPorID(idExamen : number){
    return this.http.get<Examen>(`${this.url}/${idExamen}`);
  }

  registar(Examen: Examen){
    return this.http.post(this.url, Examen);
  }

  modificar(Examen: Examen){
    return this.http.put(this.url, Examen);
  }

  eliminar(idExamen: number){
    return this.http.delete(`${this.url}/${idExamen}`);
  }
}
