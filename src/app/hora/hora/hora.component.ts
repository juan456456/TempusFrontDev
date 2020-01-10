import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGridPlugin from '@fullcalendar/timegrid';
import { RegHoraService } from 'src/services/reghora.service';
import { Calendar } from '@fullcalendar/core';
import { EmitterService } from 'src/services/emitter.service';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import * as $ from 'jquery';
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
    private emmiterService: EmitterService

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
    var horafin = arraySplt[1].split("0")[0]+"0".trim();
    var fechaini = event.el.fcSeg.start;
    var fecha1= formatDate(fechaini, 'dd-MM-yyyy','')

    console.log(fecha1);

  }

  

  onChangeSearch(val: string) {}
  onFocused(e){}
  
}
