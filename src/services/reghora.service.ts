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

  listarHorasRegistradas(idusu) : any
  {
    const headers = new HttpHeaders(  ('application/json'));
  	return this.http.get(this.url + 'horasregistradas' + '/'+ idusu, {headers : headers}); 
  }

  listarHorasRegistradasN(idusu) : any
  {
    const headers = new HttpHeaders(  ('application/json'));
  	return this.http.get(this.url + 'horasregistradasnovedades' + '/'+ idusu, {headers : headers}); 
  }
  
  agregar(data : RegHora) : any
  {
    const headers = new HttpHeaders(  ('application/json'));
    return this.http.post(this.url + 'insertar', data, {headers : headers}); 
  }

  eliminar(data) : any
  {
    const headers = new HttpHeaders(  ('application/json'));
  	return this.http.put(this.url + 'eliminar', data, {headers : headers}); 
  }

  actualizar(data) : any
  {
    const headers = new HttpHeaders(  ('application/json'));
  	return this.http.post(this.url + 'actualizar', data, {headers : headers}); 
  }

}
