import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http : HttpClient
  ) { }

  url : any = GeneralService.WS_URL + "project/";
  
  listar() : any
  {
    const headers = new HttpHeaders(GeneralService.HEADERS('application/json'));
  	return this.http.get(this.url + 'listar', {headers : headers}); 
  }
  
  /* 
  listarPorTipo(id): any
  {
    const headers = new HttpHeaders(GeneralService.HEADERS('application/json'));
  	return this.http.get(this.url + 'listarxtipo/' + id , {headers : headers}); 
  } */

  /* listarPorJefatura(estado, jefatura): any
  {
    const headers = new HttpHeaders(GeneralService.HEADERS('application/json'));
  	return this.http.get(this.url + 'listarxjefatura/' + estado + '/' + jefatura, {headers : headers}); 
  }
  
 */
}
