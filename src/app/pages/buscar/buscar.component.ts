import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FiltroConsultaDTO } from 'src/app/_dto/filtroConsultaDTO';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { UtilService } from 'src/app/_service/util.service';
import { DialogoDetalleComponent } from './dialogo-detalle/dialogo-detalle.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form!: FormGroup;
  displayedColumns = ['paciente', 'medico', 'especialidad', 'fecha', 'acciones'];
  dataSource!: MatTableDataSource<Consulta>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  progress: boolean = false;

  constructor(private consultaService: ConsultaService, private dialog: MatDialog, private utilService: UtilService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'dui': new FormControl(''),
      'nombreCompleto': new FormControl(''),
      'fechaConsulta': new FormControl()
    });

    this.utilService.estadoProgress.subscribe(data => {
      this.progress = data;
    });
  }

  buscar() {
    let filtro = new FiltroConsultaDTO(this.form.value['dui'], this.form.value['nombreCompleto'], this.form.value['fechaConsulta']);
    filtro.nombreCompleto = filtro.nombreCompleto.toLowerCase();
    this.utilService.estadoProgress.next(true);
    setTimeout(() => {

    }, 2000);

    if (filtro.fechaConsulta) {
      this.consultaService.buscar(filtro).subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.utilService.estadoProgress.next(false);
      });
    }

      this.consultaService.buscar(filtro).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  verDetalle(consulta: Consulta) {
    this.dialog.open(DialogoDetalleComponent, {
      width: '750px',
      data: consulta
    });
  }
}
