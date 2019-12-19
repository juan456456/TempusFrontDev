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
    public data: any = [];
    public id : any;
    public idcolaborador :any;

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem("logindata"));
    this.id = this.data.id;
    console.log(this.id);
    this.listar();
  }

  listar() {
    this.aprobacionService.listarusu(this.id).subscribe(
      response => {
        this.usuarios = response;
        if (this.usuarios == null) {

        } else {
          this.usuarios = response;
          console.log(this.usuarios);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  consultar() {
    this.aprobacionService.consultar(this.idcolaborador).subscribe(
      response => {
        this.usuarios2 = response;
        if (this.usuarios2 == null) {
        } else {
          this.usuarios2 = response;
          console.log(this.usuarios2);
          console.log(this.idcolaborador);
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
            this.consultar();
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
            this.consultar();
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
