import { switchMap } from 'rxjs/operators';
import { ExamenService } from '../../../_service/examen.service';
import { Examen } from '../../../_model/examen';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-examen-dialog',
  templateUrl: './examen-dialog.component.html',
  styleUrls: ['./examen-dialog.component.css']
})
export class ExamenDialogComponent implements OnInit {

  examen!: Examen;

  constructor(private dialogRef: MatDialogRef<ExamenDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: Examen, private examenService: ExamenService) { }

  ngOnInit() {
    this.examen = new Examen();
    this.examen.idExamen = this.data.idExamen;
    this.examen.nombre = this.data.nombre;
    this.examen.descripcion = this.data.descripcion;
    this.examen.estado = this.data.estado;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.examen != null && this.examen.idExamen > 0) {
      //BUENA PRACTICA para trabajar operaciones secuenciales
      this.examenService.modificar(this.examen).pipe(switchMap(() => {
        return this.examenService.listar();
      })).subscribe(examen => {
        this.examenService.examenCambio.next(examen);
        this.examenService.mensajeCambio.next("SE MODIFICO");
      });
    } else {
      this.examenService.registrar(this.examen).pipe(switchMap(() => {
        return this.examenService.listar();
      })).subscribe(examens => {
        this.examenService.examenCambio.next(examens);
        this.examenService.mensajeCambio.next("SE Registro");
      });
    }
    this.dialogRef.close();
  }
}
