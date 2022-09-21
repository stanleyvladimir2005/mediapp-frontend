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

const routes: Routes = [
  { path: 'medico', component: MedicoComponent },
  { path: 'paciente', component: PacienteComponent },
  { path: 'especialidad', component: EspecialidadComponent },
  { path: 'examen', component: ExamenComponent },
  { path: 'consulta', component: ConsultaComponent},
  { path: 'consulta-especial', component: EspecialComponent},
  { path: 'buscar', component: BuscarComponent},
  { path: 'reporte', component: ReporteComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

