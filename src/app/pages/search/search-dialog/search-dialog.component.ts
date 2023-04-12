import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consult } from 'src/app/_model/consult';
import { ConsultService } from 'src/app/_service/consult.service';
import { Exam} from "../../../_model/exam";

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {

  consult: Consult;
  exams: any[];

  constructor(private dialogRef: MatDialogRef<SearchDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Consult,
              private consultService : ConsultService) { }

  ngOnInit() {
    this.consult = { ...this.data };
    this.consultService.getExamByConsult(this.consult.idConsult).subscribe(data => {
      this.exams = data;
  });
 }

  cancel() {
    this.dialogRef.close();
  }

  protected readonly close = close;
}
