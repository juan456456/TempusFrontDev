import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(
    private http : HttpClient
  ) { }

  url : any = GeneralService.WS_URL + "project/";

  listar(id) : any
  {
    const headers = new HttpHeaders(('application/json'));
  	return this.http.get(this.url + 'listarprojectos/' + id, {headers : headers}); 
  }
  
  
  consultar(id) 
  {
    const headers = new HttpHeaders(('application/json'));
  	return this.http.get(this.url + 'listarprojects' + '/'+ id, {headers : headers}); 
  }
  
}