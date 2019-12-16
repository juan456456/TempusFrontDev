import { Component, OnInit, Input } from '@angular/core';
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
    private generalService : GeneralService
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
  @Input() fecha_inicial : any; 
  @Input() fecha_final : any; 

  // ### Valores necesarios al iniciar sesion
  public proyecto : string = "9S7CR-000122";
  public jefatura : number = 6;


  /**
   *Al iniciar el componente
   *
   * @memberof AgregarHoraComponent
   */
  ngOnInit()
  {
    
  }

  /**
   *Al actualizar el componente
   *
   * @memberof AgregarHoraComponent
   */
  ngOnChanges()
  {
    this.actualizarFormulario();

    this.listarTodo();
    this.listarActividadesAdministrativas(this.proyecto);
    this.listarProjects();
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
    this.listarActividadesGenerales(1,3).subscribe(res => {
      this.actividades = res;
      this.listarActividadesDelivery(1,4).subscribe(res => {
        this.actividades = this.actividades.concat(res);
        this.listarActividadesJefatura(1, this.jefatura, this.proyecto).subscribe(res => {
          this.actividades = this.actividades.concat(res);
        });
      });
    });
    this.listarActividadesAdministrativas(this.proyecto).subscribe(res => {
      this.actividadesAdministrativas = res;
      this.listarActividadesJefatura(1, this.jefatura, this.proyecto).subscribe(res => {
        this.actividadesAdministrativas = this.actividadesAdministrativas.concat(res);
        console.log(this.actividadesAdministrativas)
      });
    });
  }

  /**
   *Listar todas las actividades consumiento servicio de actividades
   *
   * @memberof AgregarHoraComponent
   */
  listarActividadesGenerales(estado, tipo) : any
  {
    const observable = new Observable(observer => {
      this.actividadService.listarPorTipo(estado, tipo).subscribe(
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
  listarActividadesDelivery(estado, tipo) : any
  {
    const observable = new Observable(observer => {
      this.actividadService.listarPorTipo(estado, tipo).subscribe(
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
  listarProjects()
  {
    this.projectService.listar().subscribe(
  		response => {
        this.projects = response;
  		},
  		error => {
  			console.log(<any>error);
  		}
    );
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
  listarFases(idProject)
  {
    this.projectDetailService.listarPorProject(idProject).subscribe(
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
  listarNovedades()
  {
    this.actividadService.listarNovedades().subscribe(
  		response => {
        this.actividadesNovedades = response;
  		},
  		error => {
  			console.log(<any>error);
  		}
    );
  }

  /**
   * Registrar una nueva hora de trabajo
   *
   * @memberof AgregarHoraComponent
   */
  agregar()
  {
    let reghora = new RegHora();
    reghora.idusuario = 1001;
    reghora.fechaini = this.formulario.value.fecha_inicial;
    reghora.fechafin = this.formulario.value.fecha_final;
    reghora.idactividad = this.formulario.value.actividad_principal;
    reghora.actsec = this.formulario.value.actividad_secundaria;
    reghora.proyecto = this.verProyecto();
    
    if(this.pestana == 'proyectos')
      reghora.tiporeg = 1;
    if(this.pestana == 'administrativas')
      reghora.tiporeg = 2;
    if(this.pestana == 'novedades')
      reghora.tiporeg = 3;

    reghora.idtiporeg = this.formulario.value.fase_proyecto;
    reghora.txttiporeg = this.txttiporeg();
    
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
    
   alert(reghora.tiporeg)
  }

  
  /**
   *Guardar temporalmente el txttiporeg a partir del proyecto seleccionado
   *
   * @memberof AgregarHoraComponent
   */
  txttiporeg()
  {
    if(this.projectDetail != null)
    {
      if(this.projectDetail.projects_activities.length > 0 && this.pestana == 'proyectos')
      {
        let val = this.projectDetail.projects_activities.find(
          x => x.idprojectactivityu == this.formulario.value.fase_proyecto
        );
        return val.wbs_element;
      }else{
        return null;
      }
    }else{
      return null;
    }
    
  }

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
        x => x.id == this.formulario.value.actividad_principal
      );
      return val.proyecto;
    }else{
      return null;
    }
  }

  //Métodos SelectBox para Actividades
  selectActividad(e){
    this.formulario.value.actividad_principal = e.id;
  }
  onFocusedActividad(e){
    this.formulario.value.actividad_principal = null;
  }
  onChangeActividad(e){}

  //Métodos SelectBox Projects
  selectProject(e)
  {
    this.listarFases(e.idprojects);
    //this.formulario.value.proyecto = e.idprojects;
  }
  
  onProject(e){/* this.formulario.value.proyecto = null; */}
  onChangeProject(e){}

  //Métodos para SelectBox Actividades Administrativas
  selectActividadAdministrativa(e){
    this.formulario.value.actividad_principal = e.id
  }
  onFocusedActividadAdministrativa(){
    this.formulario.value.actividad_principal = null;
  }
  onChangeActividadAdministrativa(e){}

  //Métodos SelectBox para Actividades Novedades
  selectNovedad(e){this.formulario.value.actividad_principal = e.id}
  onFocusedNovedad(e){this.formulario.value.actividad_principal = null;}
  onChangeNovedad(e){}

}
