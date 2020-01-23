import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/services/general.service';
import { AprobacionService } from "src/services/aprobacion.service";


@Component({
  selector: 'app-aprobar-horas-admin',
  templateUrl: './aprobar-horas-admin.component.html',
  styleUrls: ['./aprobar-horas-admin.component.scss']
})
export class AprobarHorasAdminComponent implements OnInit {

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
  
  tablas_uni(){
    this.aprobacionService.tablasuni(this.idcolaborador)
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
