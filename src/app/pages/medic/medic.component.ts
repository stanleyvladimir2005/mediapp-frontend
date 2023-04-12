import { MedicDialogComponent } from './medic-dialog/medic-dialog.component';
import { MedicService } from '../../_service/medic.service';
import { Medic } from '../../_model/medic';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css']
})
export class MedicComponent implements OnInit {

  dataSource: MatTableDataSource<Medic>; //Definimos la data de origen para la tabla
  displayedColumns = ['idMedic','firstName','lastName','dui','phone','email','actions']; //definimos las columnas a mostrar en la tabla

  //Propiedad que permite simular un document.getElementByIden angular 8 se necesita un static=true para habilitar la subdivisiones
  @ViewChild(MatSort,{static: true}) sort: MatSort;

  //para habilitar el conteo de elementos en el paginator
  @ViewChild(MatPaginator,{static: true}) paginator : MatPaginator;

   constructor(private medicService: MedicService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    //Bloque usando variable reactiva para actualizar la data en 2 componentes
     this.medicService.medicChange.subscribe(data => {
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort= this.sort;
     })


     //este bloque sirve para que muestre un aviso por insercion, actualizacion o eliminacion usando la variable ractiva
    this.medicService.messageChange.subscribe(data => {
      this.snackBar.open(data,'AVISO', {
        duration:2000
      });
    });

    this.medicService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort= this.sort; //se habilita la ordenacion en memoria de los elementos de la tabla
      this.dataSource.paginator = this.paginator //se habilita el conteo de paginador
    });
  }

    applyFilter(e: any) {
       this.dataSource.filter = e.target.value.trim().toLowerCase();
    }

  // ? se usa para decir que medico es opcional
    openDialog(medic?: Medic) {
      //si el medico es diferente a nulo ten la instancia, si es nulo se crea una nueva instancia
      let med = medic != null ? medic: new Medic();

       this.dialog.open(MedicDialogComponent , {
          width: '250px',
          data: med
       });
    }

    delete(idMedic: number) {
      this.medicService.delete(idMedic).pipe(switchMap(() => {
        return this.medicService.findAll();
      })).subscribe(data => {
        this.medicService.medicChange.next(data);
        this.medicService.messageChange.next('DELETED');
      });
    }
}
