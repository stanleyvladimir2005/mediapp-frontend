export class FiltroConsultaDTO {
    dui: string;
    nombreCompleto: string;
    fechaConsulta: Date;

    constructor(dui: string, nombreCompleto: string, fechaConsulta: Date) {
        this.dui = dui;
        this.nombreCompleto = nombreCompleto;
        this.fechaConsulta = fechaConsulta;
    }
}