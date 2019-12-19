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
    const headers = new HttpHeaders(GeneralService.HEADERS('application/json'));
  	return this.http.get(this.url + 'listar/' + id, {headers : headers}); 
  }
  
}
