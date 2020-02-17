import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/services/general.service';
import { AprobacionService } from "src/services/aprobacion.service";
import { ProyectosService } from "src/services/proyectos.service";

@Component({
  selector: 'app-aprobar-horas',
  templateUrl: './aprobar-horas.component.html',
  styleUrls: ['./aprobar-horas.component.scss']
})
export class AprobarHorasComponent implements OnInit {

  constructor(
    private aprobacionService: AprobacionService,
    private generalService: GeneralService,

     ) { }

     public usuarios: any = [];
     public usuarios2: any = [];
     public tablas : any = [];
    public data: any = [];
    public id : any;
    p: number = 1;
    public idcolaborador :any;

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem("logindata"));
    this.id = this.data.idusu;
    this.listar();
  }

  listar() {
    this.aprobacionService.listarusu(this.id).subscribe(
      response => {
        this.usuarios = response;
        if (this.usuarios == null) {

        } else {
          this.usuarios = response;
                }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  
  //lista tosos los proyectos por usuario
  tablas_uni(){
    this.aprobacionService.consultarProyectos(this.idcolaborador)
    .subscribe(
      response => {
        if (response != null) {
          this.tablas = response;
          console.log('tablasssssxpro',this.tablas)
      }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  exportarContratistas() {
    let json: any = [];
    let x = 0;
    this.tablas.forEach(element => {
      let data: any = {};
      data['Actividad'] = element.Act_Nombre;
      data['Actividad Sec'] = element.actsec;
      if (element.tiporeg == 1) {
        data['Tipo Registro'] = "Proyecto";
      } else {
        data['Tipo Registro'] = "Proyecto";
      }
      data['Fecha Ini'] = element.fechaini;
      data['Fecha Fin'] = element.fechafin;
      data['Cantidad Horas'] = element.canthoras;
      if (element.autorizado == 0) {
        data['Estado de Horas'] = "No apobado";
      }else{
        if (element.autorizado == 1){
          data['Estado de Horas'] = "Apobado";
        }else{
          data['Estado de Horas'] = "Pendietes";
        }
      }
      
      json[x] = data;
      x++;
    });
    json = <JSON>json;
    this.generalService.exportAsExcelFile(json);
  }

  

  aprobar(id)
  {
    GeneralService.ABRIR_CONFIRMACION().subscribe(
  		response => {
        this.aprobacionService.aprobar_admin(id).subscribe(
          response => {
            GeneralService.ABRIR_MENSAJE("Aprobacion completada", "success");
            this.tablas_uni();
          },
          error => {
            console.log(<any>error);
          }
        );
  		},
  		error => {
  			console.log(<any>error);
  		}
    );
  }

  desaprobar(id)
  {
    GeneralService.ABRIR_CONFIRMACION().subscribe(
  		response => {
        this.aprobacionService.desaprobar_admin(id).subscribe(
          response => {
            GeneralService.ABRIR_MENSAJE("Desaprobacion completada", "success");
            this.tablas_uni();
          },
          error => {
            console.log(<any>error);
          }
        );
  		},
  		error => {
  			console.log(<any>error);
  		}
    );
  }


}