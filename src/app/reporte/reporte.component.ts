import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/services/general.service';
import { ReporteService } from 'src/services/reporte.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery'; 
import { ActividadService } from 'src/services/actividad.service';
import { Actividad } from 'src/models/actividad.model.';
import {AprobacionService} from  'src/services/aprobacion.service'




@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  constructor(
    private reporteService: ReporteService,
    private generalService : GeneralService,
    private actividadService : ActividadService,
    private aprobacionService : AprobacionService,
    private formBuilder: FormBuilder,

  ) { }

  public reportes: any = [];
  public tablas : any = [];
  public formulario: FormGroup;
  public data: any = [];
  public objetos:any=[];
  public filtro: any = [];
  public actividadesNovedades : Actividad;
  p: number ;
  public fecha_inicial;
  public fecha_final;
  public listarReporte :  boolean;
  public id :  any;
  public buscador : FormGroup;  
  public buscar;


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
    this.tablas_uni();
    }
    
    tablas_uni(){
      this.aprobacionService.tablasuni(this.id)
      .subscribe(
        response => {
          if (response != null) {
            this.tablas = response;
            console.log(this.tablas)
        }
        },
        error => {
          console.log(<any>error);
        }
      )
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

  listarNovedades(proyecto)
  {
    this.actividadService.listarNovedades(proyecto).subscribe(
  		response => {
        if(response != null) {
          this.actividadesNovedades = response;
          console.log(this.actividadesNovedades)
        }
      },
  		error => {
  			console.log(<any>error);
  		}
    );
  }


  exportarExcel()
  {
    console.log(this.buscador.value.buscar)
    if(this.buscador.value.buscar == null)
    {
      console.log("hpta si entro")
      this.exportarreporte(); 
     
    }else{
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
    
    }
  }
  exportarreporte()
  {
    console.log(this.data);
    let json: any = [];
    let x = 0;
    this.reportes.forEach(element => {
      let data: any = {};
        data['ACTIVIDAD'] = element.actividad.Act_Nombre;
        data['ACTIVIDAD sec'] =element.Act_Descripcion;
        data['FECHA INICIAL'] = element.fechaini;
        data['FECHA FIN'] = element.fechafin;
        data['canthoras'] = element.canthoras;
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
