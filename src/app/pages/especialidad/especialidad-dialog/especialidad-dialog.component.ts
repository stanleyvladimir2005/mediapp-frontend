import { switchMap } from 'rxjs/operators';
import { EspecialidadService } from '../../../_service/especialidad.service';
import { Especialidad } from '../../../_model/especialidad';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-especialidad-dialog',
  templateUrl: './especialidad-dialog.component.html',
  styleUrls: ['./especialidad-dialog.component.css']
})
export class EspecialidadDialogComponent implements OnInit {

  especialidad!: Especialidad;

  constructor(private dialogRef: MatDialogRef<EspecialidadDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: Especialidad, private especialidadService: EspecialidadService) { }

  ngOnInit() {
    this.especialidad = new Especialidad();
    this.especialidad.idEspecialidad = this.data.idEspecialidad;
    this.especialidad.nombre = this.data.nombre;
    this.especialidad.estado = this.data.estado;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.especialidad != null && this.especialidad.idEspecialidad > 0) {
      //BUENA PRACTICA para trabajar operaciones secuenciales
      this.especialidadService.modificar(this.especialidad).pipe(switchMap(() => {
        return this.especialidadService.listar();
      })).subscribe(Especialidad => {
        this.especialidadService.especialidadCambio.next(Especialidad);
        this.especialidadService.mensajeCambio.next("SE MODIFICO");
      });
    } else {
      this.especialidadService.registrar(this.especialidad).pipe(switchMap(() => {
        return this.especialidadService.listar();
      })).subscribe(Especialidads => {
        this.especialidadService.especialidadCambio.next(Especialidads);
        this.especialidadService.mensajeCambio.next("SE Registro");
      });
    }
    this.dialogRef.close();
  }
}
