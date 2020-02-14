import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/services/general.service';
import { AprobacionService } from "src/services/aprobacion.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegHoraService } from '../../../services/reghora.service';




@Component({
  selector: 'app-aprobar-horas-admin',
  templateUrl: './aprobar-horas-admin.component.html',
  styleUrls: ['./aprobar-horas-admin.component.scss']
})
export class AprobarHorasAdminComponent implements OnInit {

  constructor(
    private RegHoraService: RegHoraService,
    private aprobacionService: AprobacionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,


     ) { }

     public usuarios: any = [];
     public usuarios2: any = [];
     public tablas : any = [];
    public data: any = [];
    public id : any;
    p: number = 1;
    public idcolaborador :any;
    public formulario : FormGroup;


  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem("logindata"));
    this.id = this.data.idusu;
    this.listar();
     //Form validator
    this.formulario = this.formBuilder.group({
      Mrechazo: ['', Validators.required],
    });
  
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
    this.aprobacionService.consultar(this.idcolaborador)
    .subscribe(
      response => {
        if (response != null) {
          this.tablas = response;
          console.log('tablasssss',this.tablas)
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

  editar(idreghoras)
  {
    let data = {
      'idreghoras' : idreghoras,
      'Mrechazo' : this.formulario.value.Mrechazo
    };
   
    console.log(data);
    this.RegHoraService.actualizar(data).subscribe(
      response => {
        GeneralService.ABRIR_MENSAJE("Desaprobacion completada", "success");
        this.tablas_uni();
      },
      error => {
        console.log(<any>error);
      }
    )}
 
}
