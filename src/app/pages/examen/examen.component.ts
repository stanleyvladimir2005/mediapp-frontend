import { ExamenDialogComponent } from './examen-dialog/examen-dialog.component';
import { switchMap } from 'rxjs/operators';
import { ExamenService } from '../../_service/examen.service';
import { MatTableDataSource } from '@angular/material/table';
import { Examen } from '../../_model/examen';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  dataSource!: MatTableDataSource<Examen>; //Definimos la data de origen para la tabla
  displayedColumns = ['idExamen','nombre','descripcion','acciones']; //definimos las columnas a mostrar en la tabla

  //Propiedad que permite simular un document.getElementByIden angular 8 se necesita un static=true para habilitar la subdivisiones
  @ViewChild(MatSort,{static: true}) sort!: MatSort;

  //para habilitar el conteo de elementos en el paginator
  @ViewChild(MatPaginator,{static: true}) paginator !: MatPaginator;

   constructor(private examenService: ExamenService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    //Bloque usando variable reactiva para actualizar la data en 2 componentes
     this.examenService.examenCambio.subscribe(data => {
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort= this.sort;
     })

     //este bloque sirve para que muestre un aviso por insercion, actualizacion o eliminacion usando la variable ractiva
    this.examenService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data,'AVISO', {
        duration:2000
      });
    });

    this.examenService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort= this.sort; //se habilita la ordenacion en memoria de los elementos de la tabla
      this.dataSource.paginator = this.paginator //se habilita el conteo de paginador
    });
  }

  // ? se usa para decir que examen es opcional
    openDialog(examen?: Examen) {
      //si el examen es diferente a nulo ten la instancia, si es nulo se crea una nueva instancia
      let exa = examen != null ? examen: new Examen();

       this.dialog.open(ExamenDialogComponent , {
          width: '250px',
          data: exa
       });
    }

    filtrar(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    eliminar(idExamen: number) {
      this.examenService.eliminar(idExamen).pipe(switchMap(() => {
        return this.examenService.listar();
      })).subscribe(data => {
        this.examenService.examenCambio.next(data);
        this.examenService.mensajeCambio.next('Se eliminó');
      });
    }
}
