import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(
    private http : HttpClient
  ) { }

  url : any = GeneralService.WS_URL + "actividad/";

  listarPorTipo(id): any
  {
    const headers = new HttpHeaders(GeneralService.HEADERS('application/json'));
  	return this.http.get(this.url + 'listarxtipo/' + id, {headers : headers}); 
  }

  listarPorJefatura(estado, jefatura, proyecto): any
  {
    const headers = new HttpHeaders(GeneralService.HEADERS('application/json'));
  	return this.http.get(this.url + 'listarxjefatura/' + estado + '/' + jefatura + '/' + proyecto, {headers : headers}); 
  }

  listarNovedades(): any
  {
    const headers = new HttpHeaders(GeneralService.HEADERS('application/json'));
  	return this.http.get(this.url + 'listarnovedades', {headers : headers}); 
  }

  listarAdministrativas(proyecto) : any 
  {
    const headers = new HttpHeaders(GeneralService.HEADERS('application/json'));
  	return this.http.get(this.url + 'listaradministrativas/' + proyecto, {headers : headers}); 
  }

}
