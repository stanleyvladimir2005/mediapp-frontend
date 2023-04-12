import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultAutocompleteComponent } from './consult-autocomplete/consult-autocomplete.component';
import { ConsultWizardComponent } from './consult-wizard/consult-wizard.component';
import { ConsultComponent } from './consult/consult.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExamComponent } from './exam/exam.component';
import { MedicComponent } from './medic/medic.component';
import { Not403Component } from './not403/not403.component';
import { PatientComponent } from './patient/patient.component';
import { ReportComponent } from './report/report.component';
import { SearchComponent } from './search/search.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import {GuardService} from "../_service/guard.service";

export const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent, canActivate: [GuardService]},
    {path: 'patient', component: PatientComponent, canActivate: [GuardService] },
    {path: 'exam', component: ExamComponent, canActivate: [GuardService] },
    {path: 'specialty', component: SpecialtyComponent, canActivate: [GuardService] },
    {path: 'medic', component: MedicComponent, canActivate: [GuardService] },
    {path: 'consult', component: ConsultComponent, canActivate: [GuardService]},
    {path: 'consult-autocomplete', component: ConsultAutocompleteComponent, canActivate: [GuardService]},
    {path: 'consult-wizard', component: ConsultWizardComponent, canActivate: [GuardService] },
    {path: 'search', component: SearchComponent, canActivate: [GuardService]},
    {path: 'report', component: ReportComponent, canActivate: [GuardService] },
    {path: 'not-403', component: Not403Component }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PagesRoutingModule { }
