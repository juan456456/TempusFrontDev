import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActividadService } from 'src/services/actividad.service';
import { Actividad } from 'src/models/actividad.model.';
import { ProjectService } from 'src/services/project.service';
import { Project } from 'src/models/project.model';
import { ProjectDetailService } from 'src/services/projectdetail.service';
import {RegHora} from 'src/models/reghora.model';
import { RegHoraService } from 'src/services/reghora.service';
import { GeneralService } from 'src/services/general.service';
import { Observable } from 'rxjs';
import {ProyectosService} from "src/services/proyectos.service";

@Component({
  selector: 'app-agregar-hora',
  templateUrl: './agregar-hora.component.html',
  styleUrls: ['./agregar-hora.component.scss']
})
export class AgregarHoraComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private actividadService : ActividadService,
    private projectService : ProjectService,
    private projectDetailService : ProjectDetailService,
    private reghoraService : RegHoraService,
    private generalService : GeneralService,
    private projectosService : ProyectosService,

  ) { }

  public formulario : FormGroup;
  public pestana : any = 'proyectos';
  public actividades : Array<Actividad> = [];
  public k_actividades : any = "Act_Nombre";
  public reghora : RegHora;
  public projects : Project;
  public k_projects : any = "name";
  public projectDetail : any = null;
  public actividadesAdministrativas : Array<Actividad> = [] ;
  public k_actividadesAdministrativas : any = "Act_Nombre";
  public actividadesJefatura : Array<Actividad> = [];
  public actividadesNovedades : Actividad;
  public k_actividadesNovedades : any = "Act_Nombre";
  public proyectos : any;
  public id :any;   
  public data: any = [];
  public variable_ap: any;
  public idActividad : any;
  public verProyectoo : any;
  public idProject : any;
  public estado : any;  
  public  : any;

  @Input() fecha_inicial : any; 
  @Input() fecha_final : any; 
public prodetailid;
  // ### Valores necesarios al iniciar sesion
  public proyecto : any;
  public jefatura : any;
  /*  public proyecto : string = "9S7CR-000122";
  public jefatura : number = 6; */


  /**
   *Al iniciar el componente
   *
   * @memberof AgregarHoraComponent
   */
  ngOnInit()
  {
    this.data = JSON.parse(localStorage.getItem("logindata"));
    console.log(this.data);
      this.id = this.data.idusu;
      this.estado = this.data.estado;
      this.proyecto = this.data.proyadmin;
      this.jefatura = this.data.idjefatura;
      this.listarProjects();
      this.listarTodo();
      this.listarNovedades(this.proyecto);

  }

  /**
   *Al actualizar el componente
   *
   * @memberof AgregarHoraComponent
   */
  ngOnChanges()
  {
    this.actualizarFormulario();
    this.listarActividadesAdministrativas(this.proyecto);
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

  listarTodo()
  {
    
 
    this.listarActividadesGenerales().subscribe(res => {
      this.actividades = res;
      this.listarActividadesDelivery().subscribe(res => {
        this.actividades = this.actividades.concat(res);
        this.listarActividadesJefatura(1, this.jefatura, this.proyecto).subscribe(res => {
          this.actividades = this.actividades.concat(res);
        });
      });
    });
    this.listarActividadesAdministrativas(this.proyecto).subscribe(res => {
      this.actividadesAdministrativas = res;
    });
  }

  /**
   *Listar todas las actividades consumiento servicio de actividades
   *
   * @memberof AgregarHoraComponent
   */
  listarActividadesGenerales() : any
  {
    const observable = new Observable(observer => {
      this.actividadService.listarPorTipo(this.id).subscribe(
        response => {
          observer.next(response);
        },
        error => {
          console.log(<any>error);
        }
      );
    });
    return observable;
  }

  /**
   *Listar actividades del área delivery
   *
   * @param {*} estado
   * @param {*} tipo
   * @memberof AgregarHoraComponent
   */
  listarActividadesDelivery() : any
  {
      this.actividadService.listarPorTipo(this.id).subscribe(
        response => { 
          this.actividades = response;
          if (this.actividades == null) {
          } else {
            this.actividades = response;
          }
        },
        error => {
          console.log(<any>error);
        }
      );

  }
 

  /**
   *Listar actividades por jefatura
   *
   * @param {*} estado
   * @param {*} jefatura
   * @memberof AgregarHoraComponent
   */

  listarActividadesJefatura(estado, jefatura, proyecto) : any
  {
    const observable = new Observable(observer => {
      this.actividadService.listarPorJefatura(estado, jefatura, proyecto).subscribe(
        response => {
          observer.next(response);
        },
        error => {
          console.log(<any>error);
        }
      );
    });
    return observable;
  }

  /**
   *Listar todos los proyectos consumiento el servicio de proyectos
   *
   * @memberof AgregarHoraComponent
   */
 

  listarProjects() {
    this.projectosService.listar().subscribe(
      response => { 
        this.projects = response;
        if (this.projects == null) {

        } else {
          this.projects = response;
          
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  /**
   * Listar actividades correspondientes al área administrativa
   */
  listarActividadesAdministrativas(proyecto) : any
  {
    const observable = new Observable(observer => {
      this.actividadService.listarAdministrativas(proyecto).subscribe(
        response => {
          observer.next(response);
        },
        error => {
          console.log(<any>error);
        }
      );
    });
    return observable;
  }


  /**
   *Listar fases del proyecto seleccionado 
   *
   * @param {*} idProject
   * @memberof AgregarHoraComponent
   */
  listarFases()
  {
    this.projectDetailService.listarPorProject(this.idProject).subscribe(
  		response => {
        this.projectDetail = response;  
      },
  		error => {
  			console.log(<any>error);
  		}
    );
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
  /**
   * Registrar una nueva hora de trabajo
   *
   * @memberof AgregarHoraComponent
   */
  agregar()
  {
    let reghora = new RegHora();
    reghora.idusuario = this.id;
    reghora.fechaini = this.formulario.value.fecha_inicial;
    reghora.fechafin = this.formulario.value.fecha_final;
    reghora.idactividad = this.formulario.value.actividad_principal;
    reghora.actsec = this.formulario.value.actividad_secundaria;
    if(this.pestana == 'proyectos')
      reghora.tiporeg = 1;
    if(this.pestana == 'administrativas')
      reghora.tiporeg = 2;
    if(this.pestana == 'novedades')
      reghora.tiporeg = 3;

    reghora.idtiporeg = this.cualquiercosa.idprojectactivityu;
    reghora.txttiporeg = this.cualquiercosa.wbs_element;

    reghora.proyecto = this.proyecto;

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

      }

  
  /**
   *Guardar temporalmente el txttiporeg a partir del proyecto seleccionado
   *
   * @memberof AgregarHoraComponent
   */

  /**
   *Obtener el proyecto de una actividad a partir de su ID
   *
   * @memberof AgregarHoraComponent
   */
  verProyecto()
  {

      if(this.actividades.length > 0 && this.pestana == 'administrativas')
    {
      let val = this.actividadesAdministrativas.find(
        x => x.id == this.idActividad
      );
      this.verProyectoo = val.proyecto;
    }else{
      return null;
    }  
   
  }

}