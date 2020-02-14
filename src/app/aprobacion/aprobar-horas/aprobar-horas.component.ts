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