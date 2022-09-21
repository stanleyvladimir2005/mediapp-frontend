import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialComponent } from './pages/especial/especial.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { LoginComponent } from './pages/login/login.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { PacienteDialogComponent } from './pages/paciente/paciente-dialog/paciente-dialog.component';
import { ExamenDialogComponent } from './pages/examen/examen-dialog/examen-dialog.component';
import { EspecialidadDialogComponent } from './pages/especialidad/especialidad-dialog/especialidad-dialog.component';
import { MedicoDialogComponent } from './pages/medico/medico-dialog/medico-dialog.component';
import { DialogoDetalleComponent } from './pages/buscar/dialogo-detalle/dialogo-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    MedicoComponent,
    ExamenComponent,
    EspecialidadComponent,
    ConsultaComponent,
    EspecialComponent,
    ReporteComponent,
    LoginComponent,
    BuscarComponent,
    PacienteDialogComponent,
    ExamenDialogComponent,
    EspecialidadDialogComponent,
    MedicoDialogComponent,
    DialogoDetalleComponent
  ],
  entryComponents: [MedicoDialogComponent, PacienteDialogComponent, ExamenDialogComponent, EspecialidadDialogComponent, DialogoDetalleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
