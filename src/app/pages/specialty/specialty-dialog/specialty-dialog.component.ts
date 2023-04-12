import { switchMap } from 'rxjs/operators';
import { SpecialtyService } from '../../../_service/specialty.service';
import { Specialty } from '../../../_model/specialty';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-specialty-dialog',
  templateUrl: './specialty-dialog.component.html',
  styleUrls: ['./specialty-dialog.component.css']
})
export class SpecialtyDialogComponent implements OnInit {

  specialty: Specialty;

  constructor(private dialogRef: MatDialogRef<SpecialtyDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: Specialty, private specialtyService: SpecialtyService) { }

  ngOnInit() {
    this.specialty = new Specialty();
    this.specialty.idSpecialty = this.data.idSpecialty;
    this.specialty.specialtyName = this.data.specialtyName;
    this.specialty.status = this.data.status;
  }

  close() {
    this.dialogRef.close();
  }

  operate() {
    if (this.specialty != null && this.specialty.idSpecialty > 0) {
      //BUENA PRACTICA para trabajar operaciones secuenciales
      this.specialtyService.update(this.specialty, this.specialty.idSpecialty).pipe(switchMap(() => {
        return this.specialtyService.findAll();
      })).subscribe(Specialty => {
        this.specialtyService.specialtyChange.next(Specialty);
        this.specialtyService.messageChange.next("UPDATED");
      });
    } else {
      this.specialtyService.save(this.specialty).pipe(switchMap(() => {
        return this.specialtyService.findAll();
      })).subscribe(Specialty => {
        this.specialtyService.specialtyChange.next(Specialty);
        this.specialtyService.messageChange.next("CREATED");
      });
    }
    this.dialogRef.close();
  }
}
