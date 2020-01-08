import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
    providedIn: 'root'
  })

export class ReporteService {

    constructor(
        private http: HttpClient

    ) { }

    public url: any = GeneralService.WS_URL + "reporte/";

    listar(id): any
    {
        const headers = new HttpHeaders(('aplication/json'));
        return this.http.get(this.url + 'listar/' + id, {headers : headers});
    }

    filtrarxFechas(fecha_inicial, fecha_final): any
    {
        const headers = new HttpHeaders(('aplication/json'));
        return this.http.get(this.url + 'filtraringreso/'+fecha_inicial+ "/" + fecha_final, {headers : headers});
    }
}