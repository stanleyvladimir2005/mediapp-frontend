import { Consult } from "../_model/consult";
import { Exam } from "../_model/exam";

export class ConsultListExamDTO{
    consult: Consult;
    listExam: Exam[];
}
