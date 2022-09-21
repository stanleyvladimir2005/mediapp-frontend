import { Paciente } from '../_model/paciente';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

   //se usa entorno de variantes para evitar codigo quemado. Es equivalente a http://localhost:8080  
   url: string = `${environment.HOST}/v1/pacientes`;

   pacienteCambio = new Subject<Paciente[]>(); //variable reactiva
   mensajeCambio = new Subject<string>(); //variable reactiva
 
   constructor(private http: HttpClient) { }
   /*@Autowired
   private HttpCliente http;*/ //este es el equivalente en Spring para realizar inyeccion de dependecias
 
   listar(){
    return this.http.get<Paciente[]>(this.url);
   }
 
   listarPageable(p: number, s: number){
     return this.http.get<any>(`${this.url}/pageablePaciente?page=${p}&size=${s}`); //se usa any xq no es un tipo de dato de modelar. Se busca obtener en content del servicio rest
    }
 
   //devuelve un objeto. La url se trata de forma no quemada
   listarPorID(idPaciente : number){
     return this.http.get<Paciente>(`${this.url}/${idPaciente}`);
   }
 
   registar(paciente: Paciente){
     return this.http.post(this.url, paciente);
   }
 
   modificar(paciente: Paciente){
     return this.http.put(this.url, paciente);
   }
 
   eliminar(idPaciente: number){
     return this.http.delete(`${this.url}/${idPaciente}`);
   }
}