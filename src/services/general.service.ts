import { Injectable, Input } from '@angular/core';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public static get LOGINDATA(): String {
    return JSON.parse(localStorage.getItem("logindata"));
  }

   
  public static get LOGIN_URL(): String {
    return "http://localhost/tempus2/public/ws/login/";
  }


  constructor(
    private spinner: NgxSpinnerService
  ) { }

  //Fin Mensajes de alerta
  //Text Editor
  public get text_editor_config() {
    let editorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '5rem',
      minHeight: '5rem',
      placeholder: 'Ingresa texto aquí...',
      translate: 'no',
      uploadUrl: 'v1/images', // if needed
      customClasses: [ // optional
        {
          name: "quote",
          class: "quote",
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: "titleText",
          class: "titleText",
          tag: "h1",
        },
      ]
    };
    return editorConfig;
  }

  //Variables globales

  public static WS_URL: string = 'http://localhost/tempus2/public/ws/';

  public static HEADERS(contenttype: any): any {
    let json;
    if (contenttype == null) {
      json = {
        'Token': JSON.parse(localStorage.getItem("logindata"))['token'],
      };
    } else {
      json = {
        'Token': JSON.parse(localStorage.getItem("logindata"))['token'],
        'Content-Type': contenttype
      };
    }
    return json;
  }

  //End Spinner


  // Mensajes de alerta

 public static ABRIR_CONFIRMACION(): any {
    const observable = new Observable(observer => {
      Swal.fire({
        title: '¿Está seguro?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: '¡Cancelar!',
        confirmButtonText: '¡Confirmar!'
      }).then((result) => {
        if (result.value) {
          observer.next(true);
        }
      });
    });
    return observable;
  }

  public static ABRIR_MENSAJE(msg, type) {
    let title = "Mensaje";
    if (type == "success")
      title = "¡Buen trabajo!"
    else
      title = "Error"

    Swal.fire(
      title,
      msg,
      type
    );
  }


  // Spinner

  abrirSpinner() {
    this.spinner.show();
  }

  cerrarSpinner() {
    this.spinner.hide();
  }
  //Fin text editor

  public exportAsExcelFile(json: any[]): void {
    let excelFileName = "" + Math.floor(Math.random() * 999999999999);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


}
