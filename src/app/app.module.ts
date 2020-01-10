import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from'@angular/common/http';


//Libraries
import {ShContextMenuModule} from 'ng2-right-click-menu';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { dateformat  } from 'dateformat';





//Pages
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { AprobacionComponent } from './aprobacion/aprobacion/aprobacion.component';
import { AprobarHorasComponent } from './aprobacion/aprobar-horas/aprobar-horas.component';
import { AprobarHorasAdminComponent } from './aprobacion/aprobar-horas-admin/aprobar-horas-admin.component';


//Complements
import { HeaderComponent } from './complements/header/header.component';
import { MenuComponent } from './complements/menu/menu.component';
import { FooterComponent } from './complements/footer/footer.component';
import { NotfoundComponent } from './complements/notfound/notfound.component';
import { HoraComponent } from './hora/hora/hora.component';
import { ReporteComponent } from './reporte/reporte.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AgregarHoraComponent } from './hora/agregar-hora/agregar-hora.component'; // for FullCalendar!
import { DatePipe } from '@angular/common';
import { ClaveComponent } from './clave/clave.component';
import {NgxPaginationModule} from 'ngx-pagination';


//Servicios
import { ReporteService } from '../services/reporte.service';
import { ActividadService } from '../services/actividad.service';
import { ProjectService } from '../services/project.service';
import { ProjectDetailService } from '../services/projectdetail.service';
import { RegHoraService } from '../services/reghora.service';
import { UsuarioService } from 'src/services/usuario.service';
import { LoginService } from '../services/login.service';
import { InicioService } from '../services/inicio.service';
import { AgregarNovedadesComponent } from './hora/agregar-novedades/agregar-novedades.component';
import { EmitterService } from '../services/emitter.service';

//permisos
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    NotfoundComponent,
    InicioComponent,
    LoginComponent,
    HoraComponent,
    ReporteComponent,
    AgregarHoraComponent,
    ClaveComponent,
    AprobarHorasComponent,
    AprobarHorasAdminComponent,
    AprobacionComponent,
    AgregarNovedadesComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ShContextMenuModule,
    FullCalendarModule,
    AutocompleteLibModule,
    NgxSpinnerModule,
    AngularEditorModule,
    NgxPaginationModule,
    ChartsModule,
    Ng2SearchPipeModule,
    dateformat,
    NgxPermissionsModule.forRoot(),

  ],

  providers: [
    DatePipe,
    ReporteService,
    ActividadService,
    ProjectService,
    ProjectDetailService,
    RegHoraService,
    LoginService,
    UsuarioService,
    InicioService,
    EmitterService
  ],
  
  bootstrap: [AppComponent]
})

export class AppModule { }
