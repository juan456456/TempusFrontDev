import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { HoraComponent } from './hora/hora/hora.component';
import { ReporteComponent } from './reporte/reporte.component';


const routes: Routes = [
  
  {path: '', component : InicioComponent },
  {path: 'inicio', component : InicioComponent },
  {path: 'hora', component :  HoraComponent},
  {path: 'reporte', component :  ReporteComponent},
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
