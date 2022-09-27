import { LoginComponent } from './pages/login/login.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { EspecialComponent } from './pages/especial/especial.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConsultaAsistenteComponent} from "./pages/consulta-asistente/consulta-asistente.component";
import {LayoutComponent} from "./pages/layout/layout.component";
import {Not403Component} from "./pages/not403/not403.component";
import {Not404Component} from "./pages/not404/not404.component";
import {GuardService} from "./_service/guard.service";

const routes: Routes = [

  { path: 'medico', component: MedicoComponent, canActivate: [GuardService] },
  { path: 'paciente', component: PacienteComponent, canActivate: [GuardService] },
  { path: 'especialidad', component: EspecialidadComponent, canActivate: [GuardService] },
  { path: 'examen', component: ExamenComponent, canActivate: [GuardService] },
  { path: 'consulta', component: ConsultaComponent, canActivate: [GuardService]},
  { path: 'consulta-especial', component: EspecialComponent, canActivate: [GuardService]},
  { path: 'consulta-asistente', component: ConsultaAsistenteComponent, canActivate: [GuardService]},
  { path: 'buscar', component: BuscarComponent, canActivate: [GuardService]},
  { path: 'reporte', component: ReporteComponent, canActivate: [GuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'layaout', component: LayoutComponent, canActivate: [GuardService]},
  { path : 'not-403', component: Not403Component},
  { path : 'not-404', component: Not404Component},
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
