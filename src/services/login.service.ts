import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http : HttpClient
  ) { }

  url : any = GeneralService.LOGIN_URL + "login";


  login(data): any 
  {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    let params = data;
  	return this.http.post(this.url, params, {headers : headers}); 
  }

}
