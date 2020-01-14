import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGridPlugin from '@fullcalendar/timegrid';
import { RegHoraService } from 'src/services/reghora.service';
import { Calendar } from '@fullcalendar/core';
import { GeneralService } from 'src/services/general.service';
import { EmitterService } from 'src/services/emitter.service';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { from } from 'rxjs';
declare var UIkit: any;

@Component({
  selector: 'app-hora',
  templateUrl: './hora.component.html',
  styleUrls: ['./hora.component.scss']
})
export class HoraComponent implements OnInit {

  constructor(
    private datePipe : DatePipe,
    private reghoraService : RegHoraService,
    private emmiterService: EmitterService,
    private location: Location,

  ) { }

  public calendarPlugins = [timeGridPlugin, interactionPlugin, dayGridPlugin];
  public fecha_inicial : any = '0000-00-00 00:00:00';
  public fecha_final : any = '0000-00-00 00:00:00';
  public key_proyectos = 'name';
  public pro = [];
  public events = [];
  public eventsN = [];


  /**
   *Al iniciar el componente
   *
   * @memberof HoraComponent
   */
  ngOnInit(){
    let data = JSON.parse(localStorage.getItem("logindata"));
    this.listarNovedades(data.idusu);
    this.listarNovedadesN(data.idusu);

    if (this.emmiterService.subsVar==undefined) {    
      this.emmiterService.subsVar = this.emmiterService.    
      invokeHoraRefreshEvents.subscribe((name:string) => {    
        this.listarNovedades(data.idusu);    
      });    
    }  
  }

  listarNovedades(idusu)
  {
    this.reghoraService.listarHorasRegistradas(idusu).subscribe(
  		response => {
        if(response != null) {
          this.events = response;
        }
      },
  		error => {
  			console.log(<any>error);
  		}
    );
  }

  listarNovedadesN(idusu)
  {
    this.reghoraService.listarHorasRegistradasN(idusu).subscribe(
  		response => {
        if(response != null) {
          this.eventsN = response;
          console.log(this.eventsN);
        }
      },
  		error => {
  			console.log(<any>error);
  		}
    );
  }

  /**
   *Al seleccionar un rango de días
   *
   * @param {*} event
   * @memberof HoraComponent
   */
  eventSelect(event)
  {
    console.log(event);
    this.fecha_inicial = this.datePipe.transform(event.start, 'yyyy-MM-dd HH:mm:ss');
    this.fecha_final = this.datePipe.transform(event.end, 'yyyy-MM-dd HH:mm:ss');
    var modal = UIkit.modal("#modal-agregar");
    modal.show(); 
  }


  eventSelectDate(event)
  {
    this.fecha_inicial = this.datePipe.transform(event.start, 'yyyy-MM-dd HH:mm:ss');
    /*trae un tipo de dato epoch, al cual se le resta 1 dia == 8640000 milisegundos para 
    que la fecha no se adeante un dia al seleccionar desde el calendario */
    this.fecha_final = this.datePipe.transform(event.end-86400000 , 'yyyy-MM-dd HH:mm:ss');
    
    var modal = UIkit.modal("#modal-agregar-date");
    modal.show(); 
  }


  selectEvent(event) {
    console.log(event)

    var arraySplt = event.el.text.split("-");
    var horaini = arraySplt[0].trim();
    var horafin = arraySplt[1].split(/[a-zA-Z]/)[0].trim();
    var fechaconvertir = event.el.fcSeg.start;


    
    if(horaini.length == 4){

      var fechaini = this.datePipe.transform(fechaconvertir,'yyyy-MM-dd'+ " " + '0'+ horaini);
      console.log(fechaini);
      /* var x = this.datePipe.transform(horaini,'HH:mm:ss');
      console.log("erer",x); */
    }else {

      var fechaini = this.datePipe.transform(fechaconvertir,'yyyy-MM-dd'+ " " + horaini);
      console.log(fechaini);    }

    if(horafin.length == 4){

      var fechafin = this.datePipe.transform(fechaconvertir,'yyyy-MM-dd'+ " " + '0'+ horafin);
      console.log(fechafin);

    }else {

      var fechafin = this.datePipe.transform(fechaconvertir,'yyyy-MM-dd'+ " " + horafin);
      console.log(fechafin);
    }

    let login = JSON.parse(localStorage.getItem("logindata"));
    let data = {
      'idusu' : login.idusu,
      'fechaini' : fechaini,
      'fechafin': fechafin
    };

    console.log(data);

    GeneralService.ABRIR_CONFIRMACION().subscribe(
  		response => {
        this.reghoraService.eliminar(data).subscribe(
          response => {
            if(response != null) {
               GeneralService.ABRIR_MENSAJE("Eliminado correctamente", "success");
               console.log(response);
               window.location.reload();
            }
      },
  		error => {
  			console.log(<any>error);
  		}
    );
  }
    )};
    onChangeSearch(val: string) {}
    onFocused(e){}
}
