import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActividadService } from 'src/services/actividad.service';
import { Actividad } from 'src/models/actividad.model.';
import { GeneralService } from 'src/services/general.service';
import { RegHoraService } from 'src/services/reghora.service';
import {RegHora} from 'src/models/reghora.model';
import { ProjectDetailService } from 'src/services/projectdetail.service';


@Component({
  selector: 'app-agregar-novedades',
  templateUrl: './agregar-novedades.component.html',
  styleUrls: ['./agregar-novedades.component.scss']
})
export class AgregarNovedadesComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private actividadService : ActividadService,
    private projectDetailService : ProjectDetailService,
    private generalService : GeneralService,
    private reghoraService : RegHoraService,


  ) { }

  public formulario : FormGroup;
  public actividadesNovedades : Actividad;
  public id :any;   
  public reghora : RegHora;
  public data: any = [];
  public pestana : any = 'proyectos';
  public estado: any;
  public proyecto: any;
  public projectDetail : any = null;

  public jefatura: any;
  @Input() fecha_inicial : any; 
  @Input() fecha_final : any; 



  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem("logindata"));
      this.id = this.data.idusu;
      this.estado = this.data.estado;
      this.proyecto = this.data.proyadmin;
      this.jefatura = this.data.idjefatura;
      this.listarNovedades(this.proyecto);
  }

  ngOnChanges()
  {
    this.actualizarFormulario();
  }

  actualizarFormulario()
  {
    let form = {
      fecha_inicial : [this.fecha_inicial, Validators.required],
      fecha_final : [this.fecha_final, Validators.required],
      actividad_principal : ['', Validators.required]
    };

    if(this.pestana == 'proyectos')
    {
      form['fase_proyecto'] = ['', Validators.required];
      form['actividad_secundaria'] = ['', Validators.required];
    }
    if(this.pestana == 'administrativas')
    {
      form['fase_proyecto'] = [null];
      form['actividad_secundaria'] = ['', Validators.required];
    } 
    if(this.pestana == 'novedades')
    {
      form['actividad_secundaria'] = [null];
    }
    this.formulario = this.formBuilder.group(form);
  }
  
  abrirPestana(pestana)
  {
    this.pestana = pestana;
  }



   /**
   *Listar (Novedades) Actividades
   *
   * @memberof AgregarHoraComponent
   */
  listarNovedades(proyecto)
  {
    this.actividadService.listarNovedades(proyecto).subscribe(
  		response => {
        if(response != null) {
          this.actividadesNovedades = response;
          console.log("Novedades", this.actividadesNovedades);  
        }
      },
  		error => {
  			console.log(<any>error);
  		}
    );
  }


  cualquiercosa:any=[];
  consultar(id){
    id == null
    console.log(id);
    this.projectDetailService.consultar(id).subscribe(
      res=>{
        console.log(res);
        this.cualquiercosa = res;
      },err=>{
        console.log(err);
      }
    )
  }

  agregar()
  {
    let reghora = new RegHora();
    //console.log("Princarlos",this.variable_ap);
    reghora.idusuario = this.id;
    reghora.fechaini = this.formulario.value.fecha_inicial;
    reghora.fechafin = this.formulario.value.fecha_final;
    reghora.idactividad = this.formulario.value.actividad_principal;
    reghora.actsec = this.formulario.value.actividad_secundaria;
    console.log(reghora.idactividad)
    if(this.pestana == 'proyectos')
      reghora.tiporeg = 1;
    if(this.pestana == 'administrativas')
      reghora.tiporeg = 2;
    if(this.pestana == 'novedades')
      reghora.tiporeg = 3;

    reghora.idtiporeg = this.cualquiercosa.idprojectactivityu;
    reghora.txttiporeg = this.cualquiercosa.wbs_element;

    reghora.proyecto = this.proyecto;
    
    
    console.log(this.projectDetail);

    console.log(reghora)
    this.generalService.abrirSpinner();
     this.reghoraService.agregar(reghora).subscribe(
  		response => {
        this.generalService.cerrarSpinner();
        GeneralService.ABRIR_MENSAJE("La hora se ha cargado correctamente", "success");
  		},
  		error => {
        GeneralService.ABRIR_MENSAJE("Verificar información", "error");
  			console.log(<any>error);
  		}
    ); 
    
/*    alert(reghora.tiporeg)
 */  }

  

}
