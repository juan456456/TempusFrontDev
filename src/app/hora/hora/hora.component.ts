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
import { AgregarHoraComponent } from '../agregar-hora/agregar-hora.component';
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


  selectEvent(event) {
    // console.log(event.el.innerHTML)
    var arraySplt = event.el.text.split("-");
    var horaini = arraySplt[0].trim();
    var horafin = arraySplt[1].split(/[a-zA-Z]/)[0].trim();
    var fechaconvertir = event.el.fcSeg.start;
    var cosa = event.el.innerHTML
    console.log(fechaconvertir);

    var html = cosa.split("=");
    var Asplit = html[4].split("<");
    var hora = Asplit[0];
    var Arrayhora = hora.split("-")
    console.log(Arrayhora);


    // Formato de horas 24H
    var horainicial = Arrayhora[0].replace('"', '').trim();
    var horafinal = Arrayhora[1].replace('"', '').replace('>', '').trim();
    var asdasd = Arrayhora;
    console.log("inicio", horainicial);
    console.log("fin", horafinal);
    var separado = horafinal.split(":");
    console.log(separado[1])
    var jjj = separado[1]



    switch (jjj){
      case '00 AM':
        jjj = '00'
        console.log(jjj)
        break;
        case '30 AM':
        jjj = '30'
        console.log(jjj)
        break;
        case '00 PM':
          jjj = '00'
          console.log(jjj)
          break;
          case '30 PM':
          jjj = '30'
          console.log(jjj)
          break
      default : 
      console.log("no-sirvio")
    }

    var separadoini = horainicial.split(":");
    console.log(separadoini[1])
    var imperialista = separadoini[1]
    switch (imperialista){
      case '00 AM':
        imperialista = '00'
        console.log(imperialista)
        break;
        case '30 AM':
          imperialista = '30'
        console.log(imperialista)
        break;
        case '00 PM':
          imperialista = '00'
          console.log(imperialista)
          break;
          case '30 PM':
            imperialista = '30'
          console.log(imperialista)
          break
      default : 
      console.log("no-sirvio")
    }
  
    var lugarsito = horainicial.split(" ");
    console.log(lugarsito[0],lugarsito[1]);
    switch(lugarsito[1]){
      case 'PM':
        var b = parseInt(horainicial);
        var result = b + 12;
        console.log("maquina", result, "O.O")
        break;
        default :
        var b = parseInt(horainicial);
        result = b;
        console.log("manco-man", horainicial, result) 
    }

      var estasiesx2 = result + ":" + imperialista;
      console.log("hora-inicial", estasiesx2)


    var lugar = horafinal.split(" ");
    console.log(lugar[0],lugar[1]);
    switch(lugar[1]){
      case 'PM':
        var a = parseInt(horafinal);
        var res = a + 12;
        console.log("campeon", res, "O.O")
        break;
      default :
      var a = parseInt(horafinal);
      res = a;
        console.log("paila-mijo", horafinal , res) 
    }
        var estasies = res + ":" + jjj;
        console.log("hora-final", estasies)
    
      console.log()
      console.log(lugar[0],lugar[1])


      var calendario = event.view.title
      var inte = calendario.split(" ");
      var mes = inte[0]
      console.log(inte)
  
      switch(mes)
      {
        case 'January': 
        mes = '01'
        break;
        case 'February': 
        mes = '02'
        break;
        case 'March': 
        mes = '03'
        break;
        case 'April': 
        mes = '04'
        break;
        case 'May': 
        mes = '05'
        break;
        case 'June': 
        mes = '06'
        break;
        case 'July': 
        mes = '07'
        break;
        case 'August': 
        mes = '08'
        break;
        case 'September': 
        mes = '09'
        break;
        case 'October': 
        mes = '10'
        break;
        case 'November': 
        mes = '11'
        break;
        case 'December': 
        mes = '12'
        break;
        default :
        console.log("Ese gato no sirvio");
      }
      console.log("muetsra", mes)
      var dia = inte[1].replace(',', ' ').trim()
      var año = inte[2]
      var calend = año + "-" + mes + "-" + dia
      console.log("??", calend)
  
  
      let login = JSON.parse(localStorage.getItem("logindata"));
      let data = {
        'idusu' : login.idusu,
        'fechaini' : fechaini,
        'fechafin': fechafin
      };

    if(estasiesx2.length == 4){

      var fechaini = this.datePipe.transform(calend,'yyyy-MM-dd'+ " " + '0' + estasiesx2 );
      console.log(fechaini);
     
    }else {

      var fechaini = this.datePipe.transform(calend,'yyyy-MM-dd'+ " " +  estasiesx2 );
      console.log(fechaini); 
      
      
    }

    if(estasies.length == 4){

      var fechafin = this.datePipe.transform(fechaconvertir,'yyyy-MM-dd'+ " " + '0' +estasies);
      console.log(fechafin);

    }else {

      var fechafin = this.datePipe.transform(fechaconvertir,'yyyy-MM-dd'+ " "  + estasies );
      console.log(fechafin);
    }

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
