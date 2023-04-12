import { SpecialtyDialogComponent } from './specialty-dialog/specialty-dialog.component';
import { switchMap } from 'rxjs/operators';
import { SpecialtyService } from '../../_service/specialty.service';
import { Specialty } from '../../_model/specialty';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css']
})
export class SpecialtyComponent implements OnInit {

  dataSource: MatTableDataSource<Specialty>; //Definimos la data de origen para la tabla
  displayedColumns = ['idSpecialty','specialtyName','actions']; //definimos las columnas a mostrar en la tabla

  //Propiedad que permite simular un document.getElementByIden angular 8 se necesita un static=true para habilitar la subdivisiones
  @ViewChild(MatSort,{static: true}) sort: MatSort;

  //para habilitar el conteo de elementos en el paginator
  @ViewChild(MatPaginator,{static: true}) paginator : MatPaginator;

   constructor(private specialtyService: SpecialtyService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    //Bloque usando variable reactiva para actualizar la data en 2 componentes
     this.specialtyService.specialtyChange.subscribe(data => {
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort= this.sort;
     })

     //este bloque sirve para que muestre un aviso por insercion, actualizacion o eliminacion usando la variable ractiva
    this.specialtyService.messageChange.subscribe(data => {
      this.snackBar.open(data,'AVISO', {
        duration:2000
      });
    });

    this.specialtyService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort= this.sort; //se habilita la ordenacion en memoria de los elementos de la tabla
      this.dataSource.paginator = this.paginator //se habilita el conteo de paginador
    });
  }

    applyFilter(e: any) {
      this.dataSource.filter = e.target.value.trim().toLowerCase();
    }

  // ? se usa para decir que Specialty es opcional
    openDialog(specialty?: Specialty) {
      //si el Specialty es diferente a nulo ten la instancia, si es nulo se crea una nueva instancia
      let esp = specialty != null ? specialty: new Specialty();

       this.dialog.open(SpecialtyDialogComponent , {
          width: '250px',
          data: esp
       });
    }

    delete(idSpecialty: number) {
      this.specialtyService.delete(idSpecialty).pipe(switchMap(() => {
        return this.specialtyService.findAll();
      })).subscribe(data => {
        this.specialtyService.specialtyChange.next(data);
        this.specialtyService.messageChange.next('DELETED');
      });
    }
}
