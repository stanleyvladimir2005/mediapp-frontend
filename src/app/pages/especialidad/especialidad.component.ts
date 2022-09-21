import { EspecialidadDialogComponent } from './especialidad-dialog/especialidad-dialog.component';
import { switchMap } from 'rxjs/operators';
import { EspecialidadService } from './../../_service/especialidad.service';
import { Especialidad } from './../../_model/especialidad';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  dataSource!: MatTableDataSource<Especialidad>; //Definimos la data de origen para la tabla
  displayedColumns = ['idEspecialidad','nombre','acciones']; //definimos las columnas a mostrar en la tabla
  
  //Propiedad que permite simular un document.getElementByIden angular 8 se necesita un static=true para habilitar la subdivisiones
  @ViewChild(MatSort,{static: true}) sort!: MatSort;

  //para habilitar el conteo de elementos en el paginator
  @ViewChild(MatPaginator,{static: true}) paginator !: MatPaginator;

   constructor(private especialidadService: EspecialidadService, private dialog: MatDialog, private snackBar: MatSnackBar) { }
   
  ngOnInit() {
    //Bloque usando variable reactiva para actualizar la data en 2 componentes
     this.especialidadService.especialidadCambio.subscribe(data => {
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort= this.sort;
     })

     //este bloque sirve para que muestre un aviso por insercion, actualizacion o eliminacion usando la variable ractiva
    this.especialidadService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data,'AVISO', {
        duration:2000
      });
    });

    this.especialidadService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort= this.sort; //se habilita la ordenacion en memoria de los elementos de la tabla
      this.dataSource.paginator = this.paginator //se habilita el conteo de paginador
    });
  }
 
  // ? se usa para decir que Especialidad es opcional
    openDialog(especialidad?: Especialidad) {
      //si el Especialidad es diferente a nulo ten la instancia, si es nulo se crea una nueva instancia
      let esp = especialidad != null ? especialidad: new Especialidad();

       this.dialog.open(EspecialidadDialogComponent , {
          width: '250px',
          data: esp
       });
    }

    filtrar(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    eliminar(idEspecialidad: number) {
      this.especialidadService.eliminar(idEspecialidad).pipe(switchMap(() => {
        return this.especialidadService.listar();
      })).subscribe(data => {
        this.especialidadService.especialidadCambio.next(data);
        this.especialidadService.mensajeCambio.next('Se eliminó');
      });
    }
}