import { ExamDialogComponent } from './exam-dialog/exam-dialog.component';
import { switchMap } from 'rxjs/operators';
import { ExamService } from '../../_service/exam.service';
import { MatTableDataSource } from '@angular/material/table';
import { Exam } from '../../_model/exam';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  dataSource!: MatTableDataSource<Exam>; //Definimos la data de origen para la tabla
  displayedColumns = ['idExam','examName','description','actions']; //definimos las columnas a mostrar en la tabla

  //Propiedad que permite simular un document.getElementByIden angular 8 se necesita un static=true para habilitar la subdivisiones
  @ViewChild(MatSort,{static: true}) sort: MatSort;

  //para habilitar el conteo de elementos en el paginator
  @ViewChild(MatPaginator,{static: true}) paginator : MatPaginator;

   constructor(private examService: ExamService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    //Bloque usando variable reactiva para actualizar la data en 2 componentes
     this.examService.examChange.subscribe(data => {
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort= this.sort;
     })

     //este bloque sirve para que muestre un aviso por insercion, actualizacion o eliminacion usando la variable ractiva
    this.examService.messageChange.subscribe(data => {
      this.snackBar.open(data,'AVISO', {
        duration:2000
      });
    });

    this.examService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort= this.sort; //se habilita la ordenacion en memoria de los elementos de la tabla
      this.dataSource.paginator = this.paginator //se habilita el conteo de paginador
    });
  }

    applyFilter(e: any) {
       this.dataSource.filter = e.target.value.trim().toLowerCase();
     }

  // ? se usa para decir que examen es opcional
    openDialog(exam?: Exam) {
      //si el examen es diferente a nulo ten la instancia, si es nulo se crea una nueva instancia
      let exa = exam != null ? exam: new Exam();

       this.dialog.open(ExamDialogComponent , {
          width: '250px',
          data: exa
       });
    }

    filter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    delete(idExam: number) {
      this.examService.delete(idExam).pipe(switchMap(() => {
        return this.examService.findAll();
      })).subscribe(data => {
        this.examService.examChange.next(data);
        this.examService.messageChange.next('DELETED');
      });
    }
}
