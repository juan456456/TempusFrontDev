import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';
import { RegHora } from 'src/models/reghora.model';

@Injectable({
  providedIn: 'root'
})
export class RegHoraService {

  constructor(
    private http : HttpClient
  ) { }

  url : any = GeneralService.WS_URL + "reghora/";
  
  listar() : any
  {
    const headers = new HttpHeaders(  ('application/json'));
  	return this.http.get(this.url + 'listar', {headers : headers}); 
  }
  
  agregar(data : RegHora) : any
  {
    const headers = new HttpHeaders(  ('application/json'));
    console.log(data)
    return this.http.post(this.url + 'insertar', data, {headers : headers}); 
  }

}
