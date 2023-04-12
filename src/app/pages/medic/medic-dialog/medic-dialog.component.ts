import { switchMap } from 'rxjs/operators';
import { MedicService } from '../../../_service/medic.service';
import { Medic } from '../../../_model/medic';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-medic-dialog',
  templateUrl: './medic-dialog.component.html',
  styleUrls: ['./medic-dialog.component.css']
})
export class MedicDialogComponent implements OnInit {

  medic: Medic;

  constructor(private dialogRef: MatDialogRef<MedicDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: Medic, private medicService: MedicService) { }

  ngOnInit() {
    this.medic = { ...this.data}
  }

  close() {
    this.dialogRef.close();
  }

  operate() {
    if (this.medic != null && this.medic.idMedic > 0) {
      //BUENA PRACTICA para trabajar operaciones secuenciales
      this.medicService.update(this.medic, this.medic.idMedic).pipe(switchMap(() => {
        return this.medicService.findAll();
      })).subscribe(medics => {
        this.medicService.medicChange.next(medics);
        this.medicService.messageChange.next("UPDATED");
      });
    } else {
      this.medicService.save(this.medic).pipe(switchMap(() => {
        return this.medicService.findAll();
      })).subscribe(medics => {
        this.medicService.medicChange.next(medics);
        this.medicService.messageChange.next("CREATED");
      });
    }
    this.dialogRef.close();
  }
}
