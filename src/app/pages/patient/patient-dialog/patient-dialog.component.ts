import { switchMap } from 'rxjs/operators';
import { PatientService } from '../../../_service/patient.service';
import { Patient } from '../../../_model/patient';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css']
})
export class PatientDialogComponent implements OnInit {
  patient: Patient;

  constructor(private dialogRef: MatDialogRef<PatientDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Patient,
              private patientService: PatientService) { }

  ngOnInit() {
    this.patient = {... this.data};
  }

  close() {
    this.dialogRef.close();
  }

  operate() {
    if (this.patient != null && this.patient.idPatient > 0) {
      //BUENA PRACTICA para trabajar operaciones secuenciales
      this.patientService.update(this.patient, this.patient.idPatient).pipe(switchMap(() => {
        return this.patientService.findAll();
      })).subscribe(data => {
        this.patientService.patientChange.next(data);
        this.patientService.messageChange.next("UPDATED");
      });
    } else {
      this.patientService.save(this.patient).pipe(switchMap(() => {
        return this.patientService.findAll();
      })).subscribe(data => {
        this.patientService.patientChange.next(data);
        this.patientService.messageChange.next("CREATED");
      });
    }
    this.dialogRef.close();
  }
}
