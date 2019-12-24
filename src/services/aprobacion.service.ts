import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class AprobacionService {

  constructor(
    private http : HttpClient

  ) { }

  url : any = GeneralService.WS_URL + "aprobarhoras/";

  listarusu(id) 
  {
    const headers = new HttpHeaders(  ('application/json'));
  	return this.http.get(this.url + 'listarsub' + '/'+ id, {headers : headers}); 
  }


  consultar(id) 
  {
    const headers = new HttpHeaders(  ('application/json'));
  	return this.http.get(this.url + 'consultar' + '/'+ id, {headers : headers}); 
  }

  aprobar_admin(id){
    const headers = new HttpHeaders(  ('application/json'));
  	return this.http.delete(this.url + 'ok' + '/'+ id, {headers : headers}); 
  }

  desaprobar_admin(id){
    const headers = new HttpHeaders(  ('application/json'));
  	return this.http.delete(this.url + 'not' + '/'+ id, {headers : headers}); 
  }
 

}
