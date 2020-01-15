import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGridPlugin from '@fullcalendar/timegrid';
import { RegHoraService } from 'src/services/reghora.service';
import { Calendar, formatIsoTimeString, formatDate } from '@fullcalendar/core';
import { GeneralService } from 'src/services/general.service';
import { EmitterService } from 'src/services/emitter.service';
import { DatePipe } from '@angular/common';

// import { formatDate } from '@angular/common';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { from } from 'rxjs';
import { format } from 'url';
import { exists } from 'fs';
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
  public re : any = '8:00 PM - 9:00 PM';


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
    // this.calendar.formatDate(this.fecha_inicial, format)
  }

  listarNovedades(idusu)
  {
    this.reghoraService.listarHorasRegistradas(idusu).subscribe(
  		response => {
        if(response != null) {
          this.events = response;
          console.log(response)
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


  selectEvent(event, start) {
    // console.log(event.el.innerHTML)
    var arraySplt = event.el.text.split("-");
    var horaini = arraySplt[0].trim();
    var horafin = arraySplt[1].split(/[a-zA-Z]/)[0].trim();
    var fechaconvertir = event.el.fcSeg.start;
    var cosa = event.el.innerHTML
    console.log(cosa);
 
    var html = cosa.split("=");
    // console.log(html)

    var Asplit = html[4].split("<");
    var hora = Asplit[0];
    // console.log("Array", html);
    // console.log("ArrayS", Asplit);
    // console.log("hora", hora);

    var Arrayhora = hora.split("-")
    console.log(Arrayhora);


    // Formato de horas 24H
    var horainicial = Arrayhora[0].replace('"', '').trim();
    var horafinal = Arrayhora[1].replace('"', '').replace('>', '').trim();
    var asdasd = Arrayhora;
    console.log("inicio", horainicial);
    console.log("fin", horafinal);
    // var alla = horainicial.datePipe.transform("HH:mm");
    // console.log("result", alla);

    var lugar = horafinal.split(" ");
    console.log(lugar[0],lugar[1]);
    switch(lugar[1]){
      case 'PM':
        var a = parseInt(horafinal);
        var res = a + 12;
        console.log("campeon", res, "O.O")
        break;
      case 'AM':
        var a = parseInt(horafinal);
        console.log(a);
      default :
        console.log("paila-mijo", horafinal) 
    }
      var rest = res;
      console.log(rest)  

    var estasies = res;
    console.log("hora-final", estasies)

    
    


    if(horaini.length == 4){

      var fechaini = this.datePipe.transform(fechaconvertir,'yyyy-MM-dd'+ " " +   rest + ':00');
      console.log(fechaini);
    }else {

      var fechaini = this.datePipe.transform(fechaconvertir,'yyyy-MM-dd'+ " " +  rest + ':00');
      console.log(fechaini);    }

    if(horafin.length == 4){

      var fechafin = this.datePipe.transform(fechaconvertir,'yyyy-MM-dd'+ " " +  res + ':00');
      console.log(fechafin);

    }else {

      var fechafin = this.datePipe.transform(fechaconvertir,'yyyy-MM-dd'+ " " +  res + ':00');
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
   )
  };
    onChangeSearch(val: string) {}
    onFocused(e){}
}
