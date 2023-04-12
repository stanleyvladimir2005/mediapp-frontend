import { switchMap } from 'rxjs/operators';
import { PatientDialogComponent } from './patient-dialog/patient-dialog.component';
import { PatientService } from '../../_service/patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from '../../_model/patient';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  dataSource: MatTableDataSource<Patient>; //Definimos la data de origen para la tabla
  displayedColumns = ['idPatient','firstName','lastName','dui','phone','email','actions']; //definimos las columnas a mostrar en la tabla

  //Propiedad que permite simular un document.getElementByIden angular 8 se necesita un static=true para habilitar la subdivisiones
  @ViewChild(MatSort,{static: true}) sort: MatSort;

  //para habilitar el conteo de elementos en el paginator
  @ViewChild(MatPaginator,{static: true}) paginator : MatPaginator;

  //variable auxiliar para paginacion
  quantity: number=0;

  constructor(private patientService: PatientService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    //Bloque usando variable reactiva para actualizar la data en 2 componentes
     this.patientService.patientChange.subscribe(data => {
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort= this.sort;
     })

     //este bloque sirve para que muestre un aviso por insercion, actualizacion o eliminacion usando la variable ractiva
    this.patientService.messageChange.subscribe(data => {
      this.snackBar.open(data,'Alert', {
        duration:2000
      });
    });

      //Bloque para paginacion
      this.patientService.listPageable(0, 10).subscribe(data => {
        this.quantity = data.totalElements;
        this.dataSource = new MatTableDataSource(data.content);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  showMore(e : any){
    console.log(e);
    this.patientService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.quantity = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // ? se usa para decir que Patient es opcional
    openDialog(patient?: Patient) {
      //si el Patient es diferente a nulo ten la instancia, si es nulo se crea una nueva instancia
      let pac = patient != null ? patient: new Patient();

       this.dialog.open(PatientDialogComponent , {
          width: '250px',
          data: pac
       });
    }

    delete(idPatient: number) {
      this.patientService.delete(idPatient).pipe(switchMap(() => {
        return this.patientService.findAll();
      })).subscribe(data => {
        this.patientService.patientChange.next(data);
        this.patientService.messageChange.next('DELETED');
      });
    }
}
