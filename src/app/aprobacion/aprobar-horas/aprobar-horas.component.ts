import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/services/general.service';
import { AprobacionService } from "src/services/aprobacion.service";
import {ProyectosService} from "src/services/proyectos.service";

@Component({
  selector: 'app-aprobar-horas',
  templateUrl: './aprobar-horas.component.html',
  styleUrls: ['./aprobar-horas.component.scss']
})
export class AprobarHorasComponent implements OnInit {

  constructor(
    private aprobacionService: AprobacionService,
    private projectosService : ProyectosService,
    private generalService : GeneralService,

     ) { }

    public idprojects : any;
    public id :any;   
    public data: any = [];
    public proyectos : any;
    public usuarios2: any = [];
    public idproyecto: any = [];

  
    ngOnInit() {
      this.data = JSON.parse(localStorage.getItem("logindata"));
      this.id = this.data.idusu;
      console.log(this.id);
      this.listar();
    }

  

  listar() {
    this.projectosService.listar(this.id).subscribe(
      response => { 
        this.proyectos = response;
        if (this.proyectos == null) {
        } else {
          this.proyectos = response;
          console.log(this.proyectos);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  consultar() {
    this.projectosService.consultar(this.idproyecto).subscribe(
      response => {
        this.usuarios2 = response;
        if (this.usuarios2 == null) {
        } else {
          this.usuarios2 = response;
          console.log(this.usuarios2);
          console.log(this.idproyecto);
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
