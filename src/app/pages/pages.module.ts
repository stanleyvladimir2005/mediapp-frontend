import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ConsultAutocompleteComponent } from './consult-autocomplete/consult-autocomplete.component';
import { ConsultWizardComponent } from './consult-wizard/consult-wizard.component';
import { ConsultComponent } from './consult/consult.component';
import { ExamComponent } from './exam/exam.component';
import { MedicDialogComponent } from './medic/medic-dialog/medic-dialog.component';
import { MedicComponent } from './medic/medic.component';
import { PatientComponent } from './patient/patient.component';
import { ReportComponent } from './report/report.component';
import { SearchDialogComponent } from './search/search-dialog/search-dialog.component';
import { SearchComponent } from './search/search.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from "@angular/flex-layout";
import { DashboardComponent } from './dashboard/dashboard.component';
import { Not403Component } from './not403/not403.component';
import {PagesRoutingModule} from "./pages-routing.module";
import { Not404Component } from './not404/not404.component';
import { LayoutComponent } from './layout/layout.component';
import {PatientDialogComponent} from "./patient/patient-dialog/patient-dialog.component";
import {ExamDialogComponent} from "./exam/exam-dialog/exam-dialog.component";
import {SpecialtyDialogComponent} from "./specialty/specialty-dialog/specialty-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    PdfViewerModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    PagesRoutingModule
  ],
  exports: [],
  declarations: [
    PatientComponent,
    PatientDialogComponent,
    MedicComponent,
    MedicDialogComponent,
    ExamComponent,
    ExamDialogComponent,
    SpecialtyComponent,
    SpecialtyDialogComponent,
    ConsultComponent,
    ConsultAutocompleteComponent,
    ConsultWizardComponent,
    SearchComponent,
    SearchDialogComponent,
    ReportComponent,
    LayoutComponent,
    DashboardComponent,
    Not403Component,
    Not404Component
  ],
  providers: [],
})
export class PagesModule { }
