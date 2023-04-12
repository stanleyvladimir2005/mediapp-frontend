import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultDetail } from 'src/app/_model/consultDetail';
import { Specialty } from 'src/app/_model/specialty';
import { Exam } from 'src/app/_model/exam';
import { Medic } from 'src/app/_model/medic';
import { Patient } from 'src/app/_model/patient';
import { ConsultService } from 'src/app/_service/consult.service';
import { SpecialtyService } from 'src/app/_service/specialty.service';
import { ExamService } from 'src/app/_service/exam.service';
import { MedicService } from 'src/app/_service/medic.service';
import { PatientService } from 'src/app/_service/patient.service';
import { Consult } from 'src/app/_model/consult';
import { ConsultListExamDTO } from 'src/app/_dto/consultListExamDTO';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {
  patients: Patient[] = [];
  specialtys: Specialty[] = [];
  medics: Medic[] = [];
  exams: Exam[] = [];

  dateSelected: Date = new Date();
  maxDate: Date = new Date();

  diagnosis: string;
  treatment: string;
  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];

  idPatientSelected: number;
  idMedicSelected: number;
  idSpecialtySelected: number;
  idExamSelected: number;
  message: string;

  constructor(
    private patientService: PatientService, private specialtyService: SpecialtyService, private medicService: MedicService,
    private examService: ExamService, private consultService: ConsultService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.listPatients();
    this.listSpecialtys();
    this.listMedics();
    this.listExams();
  }

  listPatients() {
    this.patientService.findAll().subscribe(data => {
      this.patients = data;
    });
  }

  listSpecialtys() {
    this.specialtyService.findAll().subscribe(data => {
      this.specialtys = data;
    });
  }

  listMedics() {
    this.medicService.findAll().subscribe(data => {
      this.medics = data;
    });
  }

  listExams() {
    this.examService.findAll().subscribe(data => {
      this.exams = data;
    });
  }

  addDetail() {
    if (this.diagnosis != null && this.treatment != null) {
      let det = new ConsultDetail();
      det.diagnosis = this.diagnosis;
      det.treatment = this.treatment;
      this.details.push(det);
    }
  }

  removeDetail(index: number) {
    this.details.splice(index, 1);
  }

  addExam() {
    if (this.idExamSelected > 0) {

      let cont = 0;
      for (let i = 0; i < this.examsSelected.length; i++) {
        let exam = this.examsSelected[i];
        if (exam.idExam === this.idExamSelected) {
          cont++;
          break;
        }
      }

      if (cont > 0) {
        this.message = 'The exam is listed';
        this.snackBar.open(this.message, "ALERT", { duration: 2000 });
      } else {
        let exam = new Exam();
        exam.idExam = this.idExamSelected;

        this.examService.findById(this.idExamSelected).subscribe(data => {
          exam.examName = data.examName;
          exam.description = data.description;
          this.examsSelected.push(exam);
        });
      }
    } else {
      this.message = 'You must add a Exam';
      this.snackBar.open(this.message, "ALERT", { duration: 2000 });
    }
  }

  removeExam(index: number) {
    this.examsSelected.splice(index, 1);
  }

  save() {
    let medic = new Medic();
    medic.idMedic = this.idMedicSelected;
    let specialty = new Specialty();
    specialty.idSpecialty = this.idSpecialtySelected;
    let patient = new Patient();
    patient.idPatient = this.idPatientSelected;

    let consult = new Consult();
    consult.specialty = specialty;
    consult.medic = medic;
    consult.patient = patient;
    consult.numberConsult = "C1";

    //ISODATE
    let tzoffset = (this.dateSelected).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    consult.consultDate = localISOTime;
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

  statusSaveBoton() {
    return (this.details.length === 0 || this.idSpecialtySelected === 0 || this.idMedicSelected === 0 || this.idPatientSelected === 0);
  }

  cleanControls() {
    this.details = [];
    this.examsSelected = [];
    this.diagnosis = '';
    this.treatment = '';
    this.idPatientSelected = 0;
    this.idMedicSelected = 0;
    this.idExamSelected = 0;
    this.dateSelected = new Date();
    this.dateSelected.setHours(0);
    this.dateSelected.setMinutes(0);
    this.dateSelected.setSeconds(0);
    this.dateSelected.setMilliseconds(0);
    this.message = '';
  }
}
