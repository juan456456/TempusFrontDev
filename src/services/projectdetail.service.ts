import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailService {

  constructor(
    private http : HttpClient
  ) { }

  url : any = GeneralService.WS_URL + "projectdetail/";
  
  consultar(id) : any
  {
    const headers = new HttpHeaders(  ('application/json'));
  	return this.http.get(this.url + 'consultar/' + id, {headers : headers}); 
  }
  

  listarPorProject(idProject)
  {
      const headers = new HttpHeaders(  ('application/json'));
  	return this.http.get(this.url + 'listarfases/' + idProject, {headers : headers}); 
  }

}
