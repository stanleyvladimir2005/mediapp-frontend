import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConsultaListaExamenDTO } from 'src/app/_dto/consultaListaExamenDTO';
import { Consulta } from 'src/app/_model/consulta';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';
import { Especialidad } from 'src/app/_model/especialidad';
import { Examen } from 'src/app/_model/examen';
import { Medico } from 'src/app/_model/medico';
import { Paciente } from 'src/app/_model/paciente';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { ExamenService } from 'src/app/_service/examen.service';
import { MedicoService } from 'src/app/_service/medico.service';
import { PacienteService } from 'src/app/_service/paciente.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-especial',
  templateUrl: './especial.component.html',
  styleUrls: ['./especial.component.css']
})
export class EspecialComponent implements OnInit {

  form: FormGroup;
  myControlPaciente: FormControl = new FormControl();
  myControlMedico: FormControl = new FormControl();
  filteredOptionsPaciente: Observable<Paciente[]>;
  filteredOptionsMedico: Observable<Medico[]>;

  pacientes: Paciente[] ;
  especialidades: Especialidad[] ;
  medicos: Medico[] ;
  examenes: Examen[] ;

  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];

  diagnostico: string;
  tratamiento: string;
  mensaje: string;

  pacienteSeleccionado: Paciente;
  medicoSeleccionado: Medico;
  especialidadSeleccionada: Especialidad;
  examenSeleccionado: Examen;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  constructor(private pacienteService: PacienteService, private examenService: ExamenService, private medicoService: MedicoService,
              private especialidadService: EspecialidadService, private consultaService: ConsultaService, private snackBar: MatSnackBar) { }

  ngOnInit() {
       this.form = new FormGroup({
      'paciente': this.myControlPaciente,
      'medico': this.myControlMedico,
      'especialidad': new FormControl(),
      'fecha': new FormControl(),
      'diagnostico': new FormControl(''),
      'tratamiento': new FormControl('')
    });

    this.loadInitialData();
    this.filteredOptionsPaciente = this.myControlPaciente.valueChanges.pipe(map(val => this.filterPaciente(val)));
    this.filteredOptionsMedico = this.myControlMedico.valueChanges.pipe(map(val => this.filterMedico(val)));
  }

  loadInitialData(){
    this.pacienteService.listar().subscribe(data => this.pacientes = data);
    this.medicoService.listar().subscribe(data => this.medicos = data);
    this.examenService.listar().subscribe(data => this.examenes = data);
    this.especialidadService.listar().subscribe(data => this.especialidades = data);
  }

  filterPaciente(val: any) {
    if(val?.idPaciente > 0){
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.dui.includes(val.dni));
    } else {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val?.toLowerCase()) || option.apellidos.toLowerCase().includes(val?.toLowerCase()) || option.dui.includes(val));
    }
  }

  filterMedico(val: any) {
    if (val?.idMedico > 0) {
      return this.medicos.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.dui.includes(val));
    } else {
      return this.medicos.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.dui.includes(val));
    }
  }

  displayFnPaciente(val: any) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  displayFnMedico(val: any) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  seleccionarPaciente(e: any) {
    this.pacienteSeleccionado = e.option.value;
  }

  seleccionarMedico(e: any) {
    this.medicoSeleccionado = e.option.value;
  }

  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  listarEspecilidad() {
    this.especialidadService.listar().subscribe(data => {
      this.especialidades = data;
    })
  }

  listarMedicos() {
    this.medicoService.listar().subscribe(data => {
      this.medicos = data;
    })
  }
  listarExamenes() {
    this.examenService.listar().subscribe(data => {
      this.examenes = data;
    })
  }

  agregar() {
    if (this.diagnostico != null && this.tratamiento != null) {
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);
      this.diagnostico = '';
      this.tratamiento = '';
    } else {
      this.mensaje = `Debe agregar un diagn??stico y tramiento`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  agregarExamen() {
    if (this.examenSeleccionado) {
      let cont = 0;
      for (let i = 0; i < this.examenesSeleccionados.length; i++) {
        let examen = this.examenesSeleccionados[i];
        if (examen.idExamen === this.examenSeleccionado.idExamen) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.mensaje = `El examen se encuentra en la lista`;
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        this.examenesSeleccionados.push(this.examenSeleccionado);
      }
    } else {
      this.mensaje = `Debe agregar un examen`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  estadoBotonRegistrar() {
    return (this.detalleConsulta.length === 0 || this.especialidadSeleccionada === null || this.medicoSeleccionado === null || this.pacienteSeleccionado === null);
  }

  removerDiagnostico(index: number) {
    this.detalleConsulta.splice(index, 1);
  }

  removerExamen(index: number) {
    this.examenesSeleccionados.splice(index, 1);
  }

  aceptar() {
    let consulta = new Consulta();
    consulta.especialidad = this.form.value['especialidad'];//this.especialidadSeleccionada;
    consulta.medico = this.form.value['medico'];// this.medicoSeleccionado;
    consulta.paciente = this.form.value['paciente'];//this.pacienteSeleccionado;

    var tzoffset = (this.form.value['fecha']).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    consulta.fecha = localISOTime;
    consulta.detalleConsulta = this.detalleConsulta;

    let consultaListaExamenDTO = new ConsultaListaExamenDTO();
    consultaListaExamenDTO.consulta = consulta;
    consultaListaExamenDTO.listaExamen = this.examenesSeleccionados;

    this.consultaService.registrar(consultaListaExamenDTO).subscribe(() => {
      this.snackBar.open("Se registr??", "Aviso", { duration: 2000 });

      setTimeout(() => {
        this.limpiarControles();
      }, 2000);
    });
  }

    limpiarControles() {
      this.form.reset();
      this.myControlPaciente.reset();
      this.myControlMedico.reset();
      this.detalleConsulta = [];
      this.examenesSeleccionados = [];
  }
}
