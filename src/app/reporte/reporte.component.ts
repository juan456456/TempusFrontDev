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

  public reporte: any = [];
  public formulario: FormGroup;
  public data: FormGroup;




  ngOnInit()
  {
    this.formulario = this.formBuilder.group({
      fecha_inicial: ['', Validators.required],
      fecha_final: ['', Validators.required]
    });
    this.data = this.formBuilder.group({
      fecha_inicial: ['', Validators.required],
      fecha_final: ['', Validators.required]
    });
    this.listar();
  }

  listar() {
    this.reporteService.listar().subscribe(
      response => {
        this.reporte = response;
        if (this.reporte == null) {

        } else {
          this.reporte = response['data'];
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  eliminar(id)
  {
    GeneralService.ABRIR_CONFIRMACION().subscribe(
      response => {
        this.reporteService.eliminar(id).subscribe(
          response => {
            GeneralService.ABRIR_MENSAJE("Eliminado correctamente", "succes");
            this.listar();
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