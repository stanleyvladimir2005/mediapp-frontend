import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  statusProgress = new Subject<boolean>();

  constructor() { }
}
