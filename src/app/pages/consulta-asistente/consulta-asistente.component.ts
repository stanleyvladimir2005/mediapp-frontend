import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Paciente} from "../../_model/paciente";
import {Medico} from "../../_model/medico";
import {Especialidad} from "../../_model/especialidad";
import {Examen} from "../../_model/examen";
import {DetalleConsulta} from "../../_model/detalleConsulta";
import {MatStepper} from "@angular/material/stepper";
import {PacienteService} from "../../_service/paciente.service";
import {MedicoService} from "../../_service/medico.service";
import {ExamenService} from "../../_service/examen.service";
import {EspecialidadService} from "../../_service/especialidad.service";
import {Consulta} from "../../_model/consulta";
import {ConsultaService} from "../../_service/consulta.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConsultaListaExamenDTO} from "../../_dto/consultaListaExamenDTO";

@Component({
  selector: 'app-consulta-asistente',
  templateUrl: './consulta-asistente.component.html',
  styleUrls: ['./consulta-asistente.component.css']
})
export class ConsultaAsistenteComponent implements OnInit {

  isLinear: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  paciente: Paciente[];
  medico: Medico[];
  especialidad: Especialidad[];
  examen: Examen[];

  maxDate: Date = new Date();
  detalles: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];
  medicosSeleccionados: Medico;
  consultas: number[] = [];
  consultasSeleccionado: number;

  patientString: string;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private examenService: ExamenService,
    private especialidadService: EspecialidadService,
    private consultaService: ConsultaService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      'pacientes': [new FormControl(), Validators.required],
      'especialidades': [new FormControl(), Validators.required],
      'examenes': [new FormControl(), Validators.required],
      'fecha': [new FormControl(new Date()), Validators.required],
      'diagnostico': new FormControl(),
      'tratamiento': new FormControl()
  });

    this.secondFormGroup = this.formBuilder.group({});
    this.loadInitialData();
  }

  loadInitialData() {
    this.pacienteService.listar().subscribe(data => this.paciente = data);
    this.medicoService.listar().subscribe(data => this.medico = data);
    this.examenService.listar().subscribe(data => this.examen = data);
    this.especialidadService.listar().subscribe(data => this.especialidad = data);

    for (let i = 1; i <= 100; i++) {
      this.consultas.push(i);
    }
  }

  addDetail() {
    let det = new DetalleConsulta();
    det.diagnostico = this.firstFormGroup.value['diagnostico'];
    det.tratamiento = this.firstFormGroup.value['tratamiento'];
    this.detalles.push(det);
  }

  removeDetail(index: number) {
    this.detalles.splice(index, 1);
  }

  addExam() {
    if (this.firstFormGroup.value['examenes'] != null) {
      this.examenesSeleccionados.push(this.firstFormGroup.value['examenes']);
    } else {
      this.snackBar.open('Seleccione un Examen', 'INFO', { duration: 2000 });
    }
  }

  selectMedic(medico: Medico) {
    this.medicosSeleccionados = medico;
  }

  selectConsult(consultNumber: number) {
    this.consultasSeleccionado = consultNumber;
  }

  nextManualStep() {
    if (this.consultasSeleccionado > 0) {
      this.stepper.next();
    } else {
      this.snackBar.open('Seleccione Numero de Consulta', 'INFO', { duration: 2000 });
    }
  }

  save() {
    let consulta = new Consulta();
    consulta.paciente = this.firstFormGroup.value['pacientes'];
    consulta.medico = this.medicosSeleccionados;
    consulta.especialidad = this.firstFormGroup.value['especialidades'];
    consulta.idConsulta = this.consultasSeleccionado;
    consulta.detalleConsulta = this.detalles;

    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    consulta.fecha = localISOTime;

    let dto = new ConsultaListaExamenDTO();
    dto.consulta = consulta;
    dto.listaExamen = this.examenesSeleccionados;

    this.consultaService.registrar(dto).subscribe(() => {
      this.snackBar.open('Se Registro', 'INFO', { duration: 2000 });

      setTimeout(() => {
        this.cleanControls();
      }, 2000);

    });
  }

  cleanControls() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.stepper.reset();
    this.detalles = [];
    this.examenesSeleccionados = [];
    this.consultasSeleccionado = 0;
    this.medicosSeleccionados = null;
  }

  get f() {
    return this.firstFormGroup.controls;
  }
}
