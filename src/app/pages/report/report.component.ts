import { ConsultService } from '../../_service/consult.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  chart: any;
  type: string;
  pdfSrc: string;
  selectedFiles: FileList;
  currentFileUpload: File ;
  labelFile!: string;
  imageData: any;
  imageStatus: boolean = false;

  constructor(private consultService: ConsultService, private sanitization : DomSanitizer) { }

  ngOnInit() {
    this.pdfSrc = '';
    this.type = 'line';
    this.draw();

    this.consultService.readFile(1).subscribe(data => {
      this.convert(data);
    });
  }

  convert(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let x = reader.result;
      this.applySanitizer(x);
    }
  }

  applySanitizer(x:any){
    this.imageData = this.sanitization.bypassSecurityTrustResourceUrl(x);
    this.imageStatus = true;
  }

  draw() {
    this.consultService.callProcedureOrFunction().subscribe(data => {
      console.log(data);

      let quantity = data.map(res => res.quantity);
      let dates = data.map(res => res.consultDate);

      console.log(quantity);
      console.log(dates);

      this.chart = new Chart('canvas', {
        type: this.type,
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Quantity',
              data: quantity,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }

  change(type: string) {
    this.type = type;
    if (this.chart) {
      this.chart.destroy();
    }
    this.draw();
  }

  viewReport() {
    this.consultService.generateReport().subscribe(data => {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        console.log(this.pdfSrc);
      }
      reader.readAsArrayBuffer(data);
    });
  }

  downloadReport() {
    this.consultService.generateReport().subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'file.pdf'
      a.click();
    });
  }

  print() {
    window.print();
  }

  selectFile(e: any) {
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;
  }

  uploadFile() {
    this.currentFileUpload = this.selectedFiles.item(0);

    this.consultService.saveFile(this.currentFileUpload)
             .subscribe(data => {this.selectedFiles = undefined; });
  }

  actionImage(accion: string){ this.imageStatus = accion === "M";
  }
}
