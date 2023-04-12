import { switchMap } from 'rxjs/operators';
import { ExamService } from '../../../_service/exam.service';
import { Exam } from '../../../_model/exam';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-exam-dialog',
  templateUrl: './exam-dialog.component.html',
  styleUrls: ['./exam-dialog.component.css']
})
export class ExamDialogComponent implements OnInit {

  exam: Exam;

  constructor(private dialogRef: MatDialogRef<ExamDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: Exam, private examService: ExamService) { }

  ngOnInit() {
    this.exam = new Exam();
    this.exam.idExam = this.data.idExam;
    this.exam.examName = this.data.examName;
    this.exam.description = this.data.description;
    this.exam.status = this.data.status;
  }

  close() {
    this.dialogRef.close();
  }

  operate() {
    if (this.exam != null && this.exam.idExam > 0) {
      //BUENA PRACTICA para trabajar operaciones secuenciales
      this.examService.update(this.exam,this.exam.idExam).pipe(switchMap(() => {
        return this.examService.findAll();
      })).subscribe(exam => {
        this.examService.examChange.next(exam);
        this.examService.messageChange.next("UPDATED");
      });
    } else {
      this.examService.save(this.exam).pipe(switchMap(() => {
        return this.examService.findAll();
      })).subscribe(exams => {
        this.examService.examChange.next(exams);
        this.examService.messageChange.next("CREATED");
      });
    }
    this.dialogRef.close();
  }
}
