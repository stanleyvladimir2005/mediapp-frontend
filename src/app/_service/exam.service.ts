import { Exam } from '../_model/exam';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {GenericService} from "./generic.service";

@Injectable({
  providedIn: 'root'
})
export class ExamService extends GenericService<Exam>{

  examChange = new Subject<Exam[]>();
  messageChange = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/v1/exams`
    );
  }
}
