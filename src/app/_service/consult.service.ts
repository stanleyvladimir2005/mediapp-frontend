import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConsultListExamDTO } from '../_dto/consultListExamDTO';
import { ConsultProductDTO } from '../_dto/consultProductDTO';
import { FilterConsultDTO } from '../_dto/filterConsultDTO';
import { Consult } from '../_model/consult';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  url: string = `${environment.HOST}/v1/consults`;

  constructor(private http: HttpClient) { }

  save(consultDTO: ConsultListExamDTO) {
    return this.http.post(this.url, consultDTO);
  }

  search(filterConsult: FilterConsultDTO) {
    return this.http.post<Consult[]>(`${this.url}/search/others`, filterConsult);
  }

  searchByDates(date1: string, date2: string){
    return this.http.get<Consult[]>(`${this.url}/search/date?date1=${date1}&date2=${date2}`)
  }

  getExamByConsult(idConsult: number){
    return this.http.get<ConsultListExamDTO[]>(`${environment.HOST}/v1/consult-exams/${idConsult}`);
  }

  callProcedureOrFunction(){
    return this.http.get<any>(`${this.url}/callProcedure`);
  }

  generateReport(){
    return this.http.get(`${this.url}/generateReport`, { responseType: 'blob'});
  }

  saveFile(data: File){
    const formdata: FormData = new FormData();
    formdata.append('file', data);
    return this.http.post(`${this.url}/saveFile`, formdata);
  }

  readFile(id: number){
    return this.http.get(`${this.url}/readFile/${id}`, { responseType: 'blob'});
  }
}
