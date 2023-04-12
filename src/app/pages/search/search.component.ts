import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FilterConsultDTO } from 'src/app/_dto/filterConsultDTO';
import { Consult } from 'src/app/_model/consult';
import { ConsultService } from 'src/app/_service/consult.service';
import { UtilService } from 'src/app/_service/util.service';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form!: FormGroup;
  displayedColumns = ['patient', 'medic', 'specialty', 'actions'];
  dataSource!: MatTableDataSource<Consult>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  progress: boolean = false;

  constructor(private consultService: ConsultService, private dialog: MatDialog, private utilService: UtilService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'dui': new FormControl(''),
      'fullName': new FormControl(''),
      'consultDate': new FormControl()
    });

    this.utilService.statusProgress.subscribe(data => {
      this.progress = data;
    });
  }

  search() {
    let filter = new FilterConsultDTO(this.form.value['dui'], this.form.value['fullName']);
    filter.fullName = filter.fullName.toLowerCase();
    this.utilService.statusProgress.next(true);
    setTimeout(() => { }, 2000);

     this.consultService.search(filter).subscribe(data => {
     this.dataSource = new MatTableDataSource(data);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
   });
  }

  getDetails(consult: Consult) {
    this.dialog.open(SearchDialogComponent, {
      width: '750px',
      data: consult
    });
  }
}
