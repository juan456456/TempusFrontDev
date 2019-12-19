import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GeneralService } from 'src/services/general.service';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private generalService : GeneralService,
    private loginService : LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  public data : FormGroup;

  ngOnInit() 
  {
    this.data = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login()
  {
    let data = 
    {
      'email' :  this.data.value.email,
      'clave' :  this.data.value.password
    };
    this.loginService.login(data).subscribe(
  		response => {
        //this.generalService.abrirMensaje("Ingreso correcto al sistema", "success");
        localStorage.setItem("loginstatus", "true");
        localStorage.setItem("logindata", JSON.stringify(response));
        window.location.href = '';
  		},
  		error => {
        GeneralService.ABRIR_MENSAJE("Verificar información", "error");
  			console.log(<any>error);
  		}
    );
    
  }

}
