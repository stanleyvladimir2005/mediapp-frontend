import { MedicoDialogComponent } from './medico-dialog/medico-dialog.component';
import { MedicoService } from '../../_service/medico.service';
import { Medico } from '../../_model/medico';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  dataSource!: MatTableDataSource<Medico>; //Definimos la data de origen para la tabla
  displayedColumns = ['idMedico','nombres','apellidos','dui','telefono','email','acciones']; //definimos las columnas a mostrar en la tabla

  //Propiedad que permite simular un document.getElementByIden angular 8 se necesita un static=true para habilitar la subdivisiones
  @ViewChild(MatSort,{static: true}) sort!: MatSort;

  //para habilitar el conteo de elementos en el paginator
  @ViewChild(MatPaginator,{static: true}) paginator !: MatPaginator;

   constructor(private MedicoService: MedicoService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    //Bloque usando variable reactiva para actualizar la data en 2 componentes
     this.MedicoService.medicoCambio.subscribe(data => {
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort= this.sort;
     })

     //este bloque sirve para que muestre un aviso por insercion, actualizacion o eliminacion usando la variable ractiva
    this.MedicoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data,'AVISO', {
        duration:2000
      });
    });

    this.MedicoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort= this.sort; //se habilita la ordenacion en memoria de los elementos de la tabla
      this.dataSource.paginator = this.paginator //se habilita el conteo de paginador
    });
  }

  // ? se usa para decir que medico es opcional
    openDialog(medico?: Medico) {
      //si el medico es diferente a nulo ten la instancia, si es nulo se crea una nueva instancia
      let med = medico != null ? medico: new Medico();

       this.dialog.open(MedicoDialogComponent , {
          width: '250px',
          data: med
       });
    }

    filtrar(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    eliminar(idMedico: number) {
      this.MedicoService.eliminar(idMedico).pipe(switchMap(() => {
        return this.MedicoService.listar();
      })).subscribe(data => {
        this.MedicoService.medicoCambio.next(data);
        this.MedicoService.mensajeCambio.next('Se eliminó');
      });
    }
}
