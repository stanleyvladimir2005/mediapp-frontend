import { ConsultDetail } from "./consultDetail";
import { Specialty } from "./specialty";
import { Medic } from "./medic";
import { Patient } from "./patient";

export class Consult {
    idConsult: number;
    patient: Patient;
    medic: Medic;
    specialty: Specialty;
    consultDate: string;
    numberConsult: string;
    details: ConsultDetail[];
}
