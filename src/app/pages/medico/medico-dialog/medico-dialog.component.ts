import { switchMap } from 'rxjs/operators';
import { MedicoService } from '../../../_service/medico.service';
import { Medico } from '../../../_model/medico';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-medico-dialog',
  templateUrl: './medico-dialog.component.html',
  styleUrls: ['./medico-dialog.component.css']
})
export class MedicoDialogComponent implements OnInit {

  medico!: Medico;

  constructor(private dialogRef: MatDialogRef<MedicoDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: Medico, private medicoService: MedicoService) { }

  ngOnInit() {
    this.medico = new Medico();
    this.medico.idMedico = this.data.idMedico;
    this.medico.nombres = this.data.nombres;
    this.medico.apellidos = this.data.apellidos;
    this.medico.dui = this.data.dui;
    this.medico.telefono = this.data.telefono;
    this.medico.email = this.data.email;
    this.medico.estado = this.data.estado;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.medico != null && this.medico.idMedico > 0) {
      //BUENA PRACTICA para trabajar operaciones secuenciales
      this.medicoService.modificar(this.medico).pipe(switchMap(() => {
        return this.medicoService.listar();
      })).subscribe(medicos => {
        this.medicoService.medicoCambio.next(medicos);
        this.medicoService.mensajeCambio.next("SE MODIFICO");
      });
    } else {
      this.medicoService.registar(this.medico).pipe(switchMap(() => {
        return this.medicoService.listar();
      })).subscribe(medicos => {
        this.medicoService.medicoCambio.next(medicos);
        this.medicoService.mensajeCambio.next("SE Registro");
      });
    }
    this.dialogRef.close();
  }
}
