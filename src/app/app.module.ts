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


//Pages
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';

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




//Servicios
import { ReporteService } from '../services/reporte.service';
import { ActividadService } from '../services/actividad.service';
import { ProjectService } from '../services/project.service';
import { ProjectDetailService } from '../services/projectdetail.service';
import { RegHoraService } from '../services/reghora.service';
import { UsuarioService } from 'src/services/usuario.service';
import { LoginService } from '../services/login.service';



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
    AngularEditorModule
  ],
  providers: [
    DatePipe,
    ReporteService,
    ActividadService,
    ProjectService,
    ProjectDetailService,
    RegHoraService,
    LoginService,
    UsuarioService

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
