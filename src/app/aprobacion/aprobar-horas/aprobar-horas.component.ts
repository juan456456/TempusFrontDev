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

  
    ngOnInit() {
      this.data = JSON.parse(localStorage.getItem("logindata"));
      this.id = this.data.id;
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


}
