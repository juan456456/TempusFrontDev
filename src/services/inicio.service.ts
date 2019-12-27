import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(
    private http : HttpClient
  ) { }

  url : any = GeneralService.WS_URL + "inicio/";


  listar(id) : any
  {
    const headers = new HttpHeaders(('application/json'));
  	return this.http.get(this.url + 'listar/' + id, {headers : headers}); 
  }

  listaradm(id) : any
  {
    const headers = new HttpHeaders(('application/json'));
  	return this.http.get(this.url + 'listaradm/' + id, {headers : headers}); 
  }
}
