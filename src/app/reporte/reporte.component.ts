import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/services/general.service';
import { ReporteService } from 'src/services/reporte.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  constructor(
    private reporteService: ReporteService,
    private formBuilder: FormBuilder,

  ) { }

  public reportes: any = [];
  public formulario: FormGroup;
  public data: any = [];
  public objetos:any=[];
  public filtro: any = [];
  p: number = 1;
  public fecha_inicial;
  public fecha_final;
  public listarReporte :  boolean;
  public id :  any;

  ngOnInit()
  {
    this.listarReporte = false;

    this.formulario = this.formBuilder.group({
      fecha_inicial: ['', Validators.required],
      fecha_final: ['', Validators.required],
    });

    this.data = JSON.parse(localStorage.getItem("logindata"));
    this.id = this.data.id;
    console.log(this.id);
    this.listar();
    this.listartabla();
  }



  listar() {
    this.reporteService.listar(this.id)
    .subscribe(
      response => {
        if (response != null) {
          this.reportes = response;
          console.log(this.reportes);
      }
      },
      error => {
        console.log(<any>error);
      }
    )
  }


  listartabla() {
    this.reporteService.listartabla().subscribe(
      response => {
        if (response != null) {
          this.objetos =response;
          // console.log(this.objetos);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  filtroFecha(){
    let fecha = {
      "fecha_inicial": this.formulario.value.fecha_inicial,
      "fecha_final": this.formulario.value.fecha_final
    };
    console.log(fecha);
    
    if(fecha.fecha_inicial > fecha.fecha_final) {
      GeneralService.ABRIR_MENSAJE("La Fecha Inicial no puede ser matoy que la fecha Final", "error");
    } else {
      this.reporteService.filtrarxFechas(fecha.fecha_inicial, fecha.fecha_final).subscribe(
        response => {
          this.filtro = response;
          if (this.filtro) {
            GeneralService.ABRIR_MENSAJE("No hay datos en fechas establecidas", "error");
            this.listar();
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    }
    this.listarReporte = false;
  }

  
  eliminar(id)
  {
    GeneralService.ABRIR_CONFIRMACION().subscribe(
      response => {
        this.reporteService.eliminar(id).subscribe(
          response => {
            GeneralService.ABRIR_MENSAJE("Eliminado correctamente", "succes");
            
          },
          error => {
            console.log(<any>error);
          }
        );
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
