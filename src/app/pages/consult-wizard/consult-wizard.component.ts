import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Patient} from "../../_model/patient";
import {Medic} from "../../_model/medic";
import {Specialty} from "../../_model/specialty";
import {Exam} from "../../_model/exam";
import {ConsultDetail} from "../../_model/consultDetail";
import {MatStepper} from "@angular/material/stepper";
import {PatientService} from "../../_service/patient.service";
import {MedicService} from "../../_service/medic.service";
import {ExamService} from "../../_service/exam.service";
import {SpecialtyService} from "../../_service/specialty.service";
import {Consult} from "../../_model/consult";
import {ConsultService} from "../../_service/consult.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConsultListExamDTO} from "../../_dto/consultListExamDTO";

@Component({
  selector: 'app-consult-wizard',
  templateUrl: './consult-wizard.component.html',
  styleUrls: ['./consult-wizard.component.css']
})
export class ConsultWizardComponent implements OnInit {

  isLinear: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  patient: Patient[];
  medic: Medic[];
  specialty: Specialty[];
  exam: Exam[];

  maxDate: Date = new Date();
  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];
  medicsSelected: Medic;
  consults: number[] = [];
  consultsSelected: number;

  patientString: string;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private examService: ExamService,
    private specialtyService: SpecialtyService,
    private consultService: ConsultService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      'patients': [new FormControl(), Validators.required],
      'specialtys': [new FormControl(), Validators.required],
      'exams': [new FormControl(), Validators.required],
      'date': [new FormControl(new Date()), Validators.required],
      'diagnosis': new FormControl(),
      'treatment': new FormControl()
  });

    this.secondFormGroup = this.formBuilder.group({});
    this.loadInitialData();
  }

  loadInitialData() {
    this.patientService.findAll().subscribe(data => this.patient = data);
    this.medicService.findAll().subscribe(data => this.medic = data);
    this.examService.findAll().subscribe(data => this.exam = data);
    this.specialtyService.findAll().subscribe(data => this.specialty = data);

    for (let i = 1; i <= 100; i++) {
      this.consults.push(i);
    }
  }

  addDetail() {
    let det = new ConsultDetail();
    det.diagnosis = this.firstFormGroup.value['diagnosis'];
    det.treatment = this.firstFormGroup.value['treatment'];
    this.details.push(det);
  }

  removeDetail(index: number) {
    this.details.splice(index, 1);
  }

  addExam() {
    if (this.firstFormGroup.value['exams'] != null) {
      this.examsSelected.push(this.firstFormGroup.value['exams']);
    } else {
      this.snackBar.open('Select an Exam', 'INFO', { duration: 2000 });
    }
  }

  selectMedic(medic: Medic) {
    this.medicsSelected = medic;
  }

  selectConsult(consultNumber: number) {
    this.consultsSelected = consultNumber;
  }

  nextManualStep() {
    if (this.consultsSelected > 0) {
      this.stepper.next();
    } else {
      this.snackBar.open('Select Consult Number', 'INFO', { duration: 2000 });
    }
  }

  save() {
    let consult = new Consult();
    consult.patient = this.firstFormGroup.value['patients'];
    consult.medic = this.medicsSelected;
    consult.specialty = this.firstFormGroup.value['specialtys'];
    consult.idConsult = this.consultsSelected;
    consult.numberConsult = `C${this.consultsSelected}`;
    consult.details = this.details;

    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    consult.consultDate = localISOTime;

    let dto = new ConsultListExamDTO();
    dto.consult = consult;
    dto.listExam = this.examsSelected;
    console.log(dto)

    this.consultService.save(dto).subscribe(() => {
      this.snackBar.open('CREATED', 'INFO', { duration: 2000 });

      setTimeout(() => {
        this.cleanControls();
      }, 2000);

    });
  }

  cleanControls() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.stepper.reset();
    this.details = [];
    this.examsSelected = [];
    this.consultsSelected = 0;
    this.medicsSelected = null;
  }

  get f() {
    return this.firstFormGroup.controls;
  }
}
