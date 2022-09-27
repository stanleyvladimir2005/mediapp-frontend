import { switchMap } from 'rxjs/operators';
import { PacienteDialogComponent } from './paciente-dialog/paciente-dialog.component';
import { PacienteService } from '../../_service/paciente.service';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from '../../_model/paciente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  dataSource!: MatTableDataSource<Paciente>; //Definimos la data de origen para la tabla
  displayedColumns = ['idPaciente','nombres','apellidos','dui','telefono','email','acciones']; //definimos las columnas a mostrar en la tabla

  //Propiedad que permite simular un document.getElementByIden angular 8 se necesita un static=true para habilitar la subdivisiones
  @ViewChild(MatSort,{static: true}) sort!: MatSort;

  //para habilitar el conteo de elementos en el paginator
  @ViewChild(MatPaginator,{static: true}) paginator !: MatPaginator;

  //variable auxiliar para paginacion
  cantidad: number=0;

  constructor(private pacienteService: PacienteService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    //Bloque usando variable reactiva para actualizar la data en 2 componentes
     this.pacienteService.pacienteCambio.subscribe(data => {
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort= this.sort;
     })

     //este bloque sirve para que muestre un aviso por insercion, actualizacion o eliminacion usando la variable ractiva
    this.pacienteService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data,'AVISO', {
        duration:2000
      });
    });

      //Bloque para paginacion
      this.pacienteService.listarPageable(0, 10).subscribe(data => {
        this.cantidad = data.totalElements;
        this.dataSource = new MatTableDataSource(data.content);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  mostrarMas(e : any){
    console.log(e);
    this.pacienteService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // ? se usa para decir que Paciente es opcional
    openDialog(paciente?: Paciente) {
      //si el Paciente es diferente a nulo ten la instancia, si es nulo se crea una nueva instancia
      let pac = paciente != null ? paciente: new Paciente();

       this.dialog.open(PacienteDialogComponent , {
          width: '250px',
          data: pac
       });
    }

    eliminar(idPaciente: number) {
      this.pacienteService.eliminar(idPaciente).pipe(switchMap(() => {
        return this.pacienteService.listar();
      })).subscribe(data => {
        this.pacienteService.pacienteCambio.next(data);
        this.pacienteService.mensajeCambio.next('Se eliminó');
      });
    }
}
