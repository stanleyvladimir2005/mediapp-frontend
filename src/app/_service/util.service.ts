import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  estadoProgress = new Subject<boolean>();
  
  constructor() { }
}
