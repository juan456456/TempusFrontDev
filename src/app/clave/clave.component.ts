import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/services/general.service';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-clave',
  templateUrl: './clave.component.html',
  styleUrls: ['./clave.component.scss']
})
export class ClaveComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private generalService : GeneralService,
    private usuarioService : UsuarioService
  ) { }
  
  public data : FormGroup;
  public idUsuario : any = JSON.parse(localStorage.getItem("logindata"))['id'];

  ngOnInit()
  {
    this.data = this.formBuilder.group({
      clave: ['', Validators.required],
      rclave: ['', Validators.required],
    });
  }

  actualizar()
  {

    if(this.data.value.clave != this.data.value.rclave)
    {
      GeneralService.ABRIR_MENSAJE("Verificar información, Las claves no coinciden", "error");
      return;
    }

    if(this.data.value.clave.length <= 6)
    {
      GeneralService.ABRIR_MENSAJE("Verificar información, Las claves debe superar los 6 caracteres", "error");
      return;
    }

    let data = {
      'id' : this.idUsuario,
      'password' : this.data.value.clave
    };

    this.generalService.abrirSpinner();
    this.usuarioService.actualizarClave(data).subscribe(
  		response => {
        this.generalService.cerrarSpinner();
        GeneralService.ABRIR_MENSAJE("La contraseña se ha actualizado correctamente", "success");
  		},
  		error => {
        GeneralService.ABRIR_MENSAJE("Verificar información", "error");
        this.generalService.cerrarSpinner();
  			console.log(<any>error);
  		}
    );

  }

}
