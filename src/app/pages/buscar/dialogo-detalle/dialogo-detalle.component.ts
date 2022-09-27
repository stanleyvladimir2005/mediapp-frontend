import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { Examen} from "../../../_model/examen";

@Component({
  selector: 'app-dialogo-detalle',
  templateUrl: './dialogo-detalle.component.html',
  styleUrls: ['./dialogo-detalle.component.css']
})
export class DialogoDetalleComponent implements OnInit {

  consulta: Consulta;
  examenes: any[];

  constructor(private dialogRef: MatDialogRef<DialogoDetalleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Consulta,
              private consultaService : ConsultaService) { }

  ngOnInit() {
    this.consulta = { ...this.data };
    this.consultaService.listarExamenPorConsulta(this.consulta.idConsulta).subscribe(data => {
      this.examenes = data;
  });
 }

  cancelar() {
    this.dialogRef.close();
  }
}
