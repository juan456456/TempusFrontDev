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
    const headers = new HttpHeaders(  ('application/json'));
  	return this.http.get(this.url + 'listar', {headers : headers}); 
  }
}
