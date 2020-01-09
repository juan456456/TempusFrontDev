import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/services/general.service';
import { ReporteService } from 'src/services/reporte.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery'; 


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  constructor(
    private reporteService: ReporteService,
    private generalService : GeneralService,
    private formBuilder: FormBuilder,

  ) { }

  public reportes: any = [];
  public formulario: FormGroup;
  public data: any = [];
  public objetos:any=[];
  public filtro: any = [];
  p: number = 1;
  public fecha_inicial;
  public fecha_final;
  public listarReporte :  boolean;
  public id :  any;
  public buscador : FormGroup;  


  ngOnInit()
  {
    this.buscador = this.formBuilder.group({
      buscar:['', Validators.required],
    });

    this.listarReporte = false;

    this.formulario = this.formBuilder.group({
      fecha_inicial: ['', Validators.required],
      fecha_final: ['', Validators.required],
    });

    this.data = JSON.parse(localStorage.getItem("logindata"));
    this.id = this.data.idusu;
    this.listar();
    }
    
    
  listar() {
    this.reporteService.listar(this.id)
    .subscribe(
      response => {
        if (response != null) {
          this.reportes = response;
          console.log(this.reportes);
      }
      },
      error => {
        console.log(<any>error);
      }
    )
  }



  exportarExcel()
  {
    if(this.buscador.value.buscar != null)
    {
      var json = [];
      let x = 0;

      $('#tablareporte tr').each(function () {

        var data={
        'ACTIVIDAD' : $(this).find("td").eq(0).html(),
        'ACTIVIDAD sec': $(this).find("td").eq(1).html(),
        'FECHA INICIAL': $(this).find("td").eq(2).html(),
        'FECHA FIN':$(this).find("td").eq(3).html(),
        'canthoras': $(this).find("td").eq(4).html(),
        'autorizado' : $(this).find("td").eq(5).html(),
        }
        json[x] = data;
        x++
      });

    this.generalService.exportAsExcelFile(json);
    
    }else{
      this.exportarreporte(); 
    }
  }
  exportarreporte()
  {
    let json: any = [];
    let x = 0;
    this.reportes.forEach(element => {
      let data: any = {};
      data['ACTIVIDAD'] = element.actividad.Act_Nombre;
      data['ACTIVIDAD sec'] = element.actividad.Act_Descripcion;
      data['FECHA INI'] = element.fechaini;
      data['FECHA FIN'] = element.fechafin;
      data['CANT HORAS	'] = element.canthoras;

      if(element.autorizado == 0){
        data['estado'] = "no autorizado";
      }else{
        data['estado'] = "autorizado";
      }
      json[x] = data;
      x++;
    });
    json = <JSON>json;
    this.generalService.exportAsExcelFile(json);
  }
 



  filtroFecha(){
    let fecha = {
      "fecha_inicial": this.formulario.value.fecha_inicial,
      "fecha_final": this.formulario.value.fecha_final
    };
    
    if(fecha.fecha_inicial > fecha.fecha_final) {
      GeneralService.ABRIR_MENSAJE("La Fecha Inicial no puede ser matoy que la fecha Final", "error");
    } else {
      this.reporteService.filtrarxFechas(fecha.fecha_inicial, fecha.fecha_final).subscribe(
        response => {
          this.filtro = response;
          if (this.filtro) {
            GeneralService.ABRIR_MENSAJE("No hay datos en fechas establecidas", "error");
            this.listar();
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    }
    this.listarReporte = false;
  }
}
