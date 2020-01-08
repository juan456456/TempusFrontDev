import { Component, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { InicioService } from 'src/services/inicio.service'


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  public inicio: any = [];
  public data: any = [];
  public fechas: any = [];
  public horas: any = [];
  public fechasADM: any = [];
  public horasADM: any = [];
  

  //RESUMEN REGISTRO DE HORAS DE PROYECTOS

  public barChartOptions: ChartOptions = {
    responsive: true,
    // Utilizamos estas estructuras vacías como marcadores de posición para temas dinámicos.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = this.fechas ; 
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: this.horas, label: 'Horas' }
  ];

  public lineChartColors: Color[] = [
    { // azul
      backgroundColor: 'rgba(135, 191, 224)',
      borderColor: 'rgba(52, 20, 181)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#3414b5',
      pointHoverBackgroundColor: '#3414b5',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ]

  // RESUMEN REGISTRO DE HORAS ADMINISTRATIVAS

  public barChartOptionsAdm: ChartOptions = {
    responsive: true,
    // Utilizamos estas estructuras vacías como marcadores de posición para temas dinámicos.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabelsAdm: Label[] = this.fechasADM ;
  public barChartTypeAdm: ChartType = 'bar';
  public barChartLegendAdm = true;

  public barChartDataAdm: ChartDataSets[] = [
    { data: this.horasADM, label: 'Horas' }
  ];


  constructor(
    private inicioService: InicioService
  ) {}


  public id :  any;

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem("logindata"));
    this.id = this.data.idusu;
    this.listar(this.id);
    this.listaradm(this.id);
  }

//Listar Horas de proyectos

  listar(id) {
    this.inicioService.listar(id)
    .subscribe(
      response => {
        if (response != null) {
        this.inicio = response;  

        this.inicio.forEach(element => {
         this.fechas.push(element.fechaini);
         });
        
         this.inicio.forEach(element => {
           this.horas.push(element.canthoras)
         });

      }
    },
      error => {        
      console.log(<any>error);
    }
    )
  }


  // Listar horas administrativas
  
  listaradm(id) {
    this.inicioService.listaradm(id)
    .subscribe(
      response => {
        if (response != null) {
        this.inicio = response;  

        this.inicio.forEach(element => {
         this.fechasADM.push(element.fechaini);
         });
        
         this.inicio.forEach(element => {
           this.horasADM.push(element.canthoras)
         });

      }
    },
      error => {        
      console.log(<any>error);
    }
    )
  }
}