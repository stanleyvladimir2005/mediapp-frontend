import { switchMap } from 'rxjs/operators';
import { PacienteService } from '../../../_service/paciente.service';
import { Paciente } from '../../../_model/paciente';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-paciente-dialog',
  templateUrl: './paciente-dialog.component.html',
  styleUrls: ['./paciente-dialog.component.css']
})
export class PacienteDialogComponent implements OnInit {

  paciente!: Paciente;

  constructor(private dialogRef: MatDialogRef<PacienteDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: Paciente, private pacienteService: PacienteService) { }

  ngOnInit() {
    this.paciente = new Paciente();
    this.paciente.idPaciente = this.data.idPaciente;
    this.paciente.nombres = this.data.nombres;
    this.paciente.apellidos = this.data.apellidos;
    this.paciente.dui = this.data.dui;
    this.paciente.direccion = this.data.direccion;
    this.paciente.telefono = this.data.telefono;
    this.paciente.email = this.data.email;
    this.paciente.estado = this.data.estado;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.paciente != null && this.paciente.idPaciente > 0) {
      //BUENA PRACTICA para trabajar operaciones secuenciales
      this.pacienteService.modificar(this.paciente).pipe(switchMap(() => {
        return this.pacienteService.listar();
      })).subscribe(Pacientes => {
        this.pacienteService.pacienteCambio.next(Pacientes);
        this.pacienteService.mensajeCambio.next("SE Modifico");
      });
    } else {
      this.pacienteService.registrar(this.paciente).pipe(switchMap(() => {
        return this.pacienteService.listar();
      })).subscribe(pacientes => {
        this.pacienteService.pacienteCambio.next(pacientes);
        this.pacienteService.mensajeCambio.next("SE Registro");
      });
    }
    this.dialogRef.close();
  }
}
