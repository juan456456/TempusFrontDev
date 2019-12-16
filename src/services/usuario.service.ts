import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url : any = GeneralService.LOGIN_URL + "usuario/";
  
  constructor(
    private http : HttpClient
  )
  {}


  actualizarClave(data)
  {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let params = data;
    return this.http.put(this.url + 'actualizarClave', data, {headers : headers}); 
  }

}
