import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {ConsultaAsistenteComponent} from "./pages/consulta-asistente/consulta-asistente.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {environment} from "../environments/environment";
import {JwtModule} from "@auth0/angular-jwt";
import { LayoutComponent } from './pages/layout/layout.component';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import {ServerErrorsInterceptor} from "./pages/shared/server-errors.interceptor";

export function tokenGetter(){
  let tk = sessionStorage.getItem(environment.TOKEN_NAME);
  let token = tk != null ? tk : '';
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    MedicoComponent,
    ExamenComponent,
    EspecialidadComponent,
    ConsultaComponent,
    ConsultaAsistenteComponent,
    EspecialComponent,
    ReporteComponent,
    LoginComponent,
    BuscarComponent,
    PacienteDialogComponent,
    ExamenDialogComponent,
    EspecialidadDialogComponent,
    MedicoDialogComponent,
    DialogoDetalleComponent,
    LayoutComponent,
    Not403Component,
    Not404Component,
  ],
  entryComponents: [MedicoDialogComponent, PacienteDialogComponent, ExamenDialogComponent, EspecialidadDialogComponent, DialogoDetalleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule, //para uso de forms
    FormsModule, //para two-way binding
    FlexLayoutModule,
    PdfViewerModule,
    MatProgressBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8082'],
        disallowedRoutes: ['http://localhost:8082/login/forget']
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ServerErrorsInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
