import { Medico } from '../_model/medico';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

    //se usa entorno de variantes para evitar codigo quemado. Es equivalente a http://localhost:8080  
    url: string = `${environment.HOST}/v1/medicos`;

    medicoCambio = new Subject<Medico[]>(); //variable reactiva
    mensajeCambio = new Subject<string>(); //variable reactiva
  
    constructor(private http: HttpClient) { }
  
    /*@Autowired
    private HttpCliente http;*/ //este es el equivalente en Spring para realizar inyeccion de dependecias
  
    listar(){
     return this.http.get<Medico[]>(this.url);
    }
  
    //devuelve un objeto. La url se trata de forma no quemada
    listarPorID(idMedico : number){
      return this.http.get<Medico>(`${this.url}/${idMedico}`);
    }
  
    registar(medico: Medico){
      return this.http.post(this.url, medico);
    }
  
    modificar(medico: Medico){
      return this.http.put(this.url, medico);
    }
  
    eliminar(idMedico: number){
      return this.http.delete(`${this.url}/${idMedico}`); 
    }
}