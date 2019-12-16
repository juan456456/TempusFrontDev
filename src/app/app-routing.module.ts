import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { HoraComponent } from './hora/hora/hora.component';
import { ReporteComponent } from './reporte/reporte.component';
import { LoginComponent } from './login/login.component';
import { ClaveComponent } from './clave/clave.component';


const routes: Routes = [

  {path: '', component : InicioComponent },
  {path: 'inicio', component : InicioComponent },
  {path: 'hora', component :  HoraComponent},
  {path: 'reporte', component :  ReporteComponent},
  {path: 'login', component : LoginComponent},
  {path: 'clave', component : ClaveComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
