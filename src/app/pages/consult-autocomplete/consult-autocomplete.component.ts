import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {ConsultListExamDTO} from 'src/app/_dto/consultListExamDTO';
import {Consult} from 'src/app/_model/consult';
import {ConsultDetail} from 'src/app/_model/consultDetail';
import {Specialty} from 'src/app/_model/specialty';
import {Exam} from 'src/app/_model/exam';
import {Medic} from 'src/app/_model/medic';
import {Patient} from 'src/app/_model/patient';
import {ConsultService} from 'src/app/_service/consult.service';
import {SpecialtyService} from 'src/app/_service/specialty.service';
import {ExamService} from 'src/app/_service/exam.service';
import {MedicService} from 'src/app/_service/medic.service';
import {PatientService} from 'src/app/_service/patient.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-consult-autocomplete',
  templateUrl: './consult-autocomplete.component.html',
  styleUrls: ['./consult-autocomplete.component.css']
})
export class ConsultAutocompleteComponent implements OnInit {

  form: FormGroup;
  myControlPatient: FormControl = new FormControl();
  myControlMedic: FormControl = new FormControl();
  filteredOptionsPatient: Observable<Patient[]>;
  filteredOptionsMedic: Observable<Medic[]>;

  patients: Patient[] ;
  specialtys: Specialty[] ;
  medics: Medic[] ;
  exams: Exam[] ;

  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];

  diagnosis: string;
  treatment: string;
  message: string;

  patientSelected: Patient;
  medicSelected: Medic;
  specialtySelected: Specialty;
  examSelected: Exam;

  dateSelect: Date = new Date();
  maxDate: Date = new Date();

  constructor(private patientService: PatientService, private examService: ExamService, private medicService: MedicService,
              private specialtyService: SpecialtyService, private consultService: ConsultService, private snackBar: MatSnackBar) { }

  ngOnInit() {
       this.form = new FormGroup({
      'patient': this.myControlPatient,
      'medic': this.myControlMedic,
      'specialty': new FormControl(),
      'date': new FormControl(),
      'diagnosis': new FormControl(''),
      'treatment': new FormControl('')
    });

    this.loadInitialData();
    this.filteredOptionsPatient = this.myControlPatient.valueChanges.pipe(map(val => this.filterPatient(val)));
    this.filteredOptionsMedic = this.myControlMedic.valueChanges.pipe(map(val => this.filterMedic(val)));
  }

  loadInitialData(){
    this.patientService.findAll().subscribe(data => this.patients = data);
    this.medicService.findAll().subscribe(data => this.medics = data);
    this.examService.findAll().subscribe(data => this.exams = data);
    this.specialtyService.findAll().subscribe(data => this.specialtys = data);
  }

  filterPatient(val: any) {
    if(val?.idPatient > 0){
      return this.patients.filter(option =>
        option.firstName.toLowerCase().includes(val.firstName.toLowerCase()) || option.lastName.toLowerCase().includes(val.lastName.toLowerCase()) || option.dui.includes(val.dui));
    } else {
      return this.patients.filter(option =>
        option.firstName.toLowerCase().includes(val?.toLowerCase()) || option.lastName.toLowerCase().includes(val?.toLowerCase()) || option.dui.includes(val));
    }
  }

  filterMedic(val: any) {
    if (val?.idMedic > 0) {
      return this.medics.filter(option =>
        option.firstName.toLowerCase().includes(val.firstName.toLowerCase()) || option.lastName.toLowerCase().includes(val.lastName.toLowerCase()) || option.dui.includes(val.dui));
    } else {
      return this.medics.filter(option =>
        option.firstName.toLowerCase().includes(val?.toLowerCase()) || option.lastName.toLowerCase().includes(val?.toLowerCase()) || option.dui.includes(val));
    }
  }

  displayFnPatient(val: any) {
    return val ? `${val.firstName} ${val.lastName}` : val;
  }

  displayFnMedic(val: any) {
    return val ? `${val.firstName} ${val.lastName}` : val;
  }

  selectPatient(e: any) {
    this.patientSelected = e.option.value;
  }

  selectMedic(e: any) {
    this.medicSelected = e.option.value;
  }

  listPatients() {
    this.patientService.findAll().subscribe(data => {
      this.patients = data;
    });
  }

  listSpecialty() {
    this.specialtyService.findAll().subscribe(data => {
      this.specialtys = data;
    })
  }

  listMedics() {
    this.medicService.findAll().subscribe(data => {
      this.medics = data;
    })
  }
  listExams() {
    this.examService.findAll().subscribe(data => {
      this.exams = data;
    })
  }

  addDetail() {
    if (this.diagnosis != null && this.treatment != null) {
      let det = new ConsultDetail();
      det.diagnosis = this.diagnosis;
      det.treatment = this.treatment;
      this.details.push(det);
      this.diagnosis = '';
      this.treatment = '';
    } else {
      this.message = `You must add a diagnosis and treatment`;
      this.snackBar.open(this.message, "ALERT", { duration: 2000 });
    }
  }

  addExam() {
    if (this.examSelected) {
      let cont = 0;
      for (let i = 0; i < this.examsSelected.length; i++) {
        let exam = this.examsSelected[i];
        if (exam.idExam === this.examSelected.idExam) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.message = `The exam is listed`;
        this.snackBar.open(this.message, "ALERT", { duration: 2000 });
      } else {
        this.examsSelected.push(this.examSelected);
      }
    } else {
      this.message = `You must add a Exam`;
      this.snackBar.open(this.message, "ALERT", { duration: 2000 });
    }
  }

  statusSaveBoton() {
    return (this.details.length === 0 || this.specialtySelected === null || this.medicSelected === null || this.patientSelected === null);
  }

  removeDiagnosis(index: number) {
    this.details.splice(index, 1);
  }

  removeExam(index: number) {
    this.examsSelected.splice(index, 1);
  }

  save() {
    let consult = new Consult();
    consult.specialty = this.form.value['specialty'];//this.especialidadSeleccionada;
    consult.medic = this.form.value['medic'];// this.medicoSeleccionado;
    consult.patient = this.form.value['patient'];//this.pacienteSeleccionado;
    consult.numberConsult = "C1";

    var tzoffset = (this.form.value['date']).getTimezoneOffset() * 60000;
    consult.consultDate = (new Date(Date.now() - tzoffset)).toISOString();
    consult.details = this.details;

    let consultListExamDTO = new ConsultListExamDTO();
    consultListExamDTO.consult = consult;
    consultListExamDTO.listExam = this.examsSelected;

    this.consultService.save(consultListExamDTO).subscribe(() => {
      this.snackBar.open("CREATED", "ALERT", { duration: 2000 });

      setTimeout(() => {
        this.cleanControls();
      }, 2000);
    });
  }

    cleanControls() {
      this.form.reset();
      this.myControlPatient.reset();
      this.myControlMedic.reset();
      this.details = [];
      this.examsSelected = [];
  }
}
