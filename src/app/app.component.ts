import { Component } from '@angular/core';
import { GeneralService } from 'src/services/general.service';
import { NgxPermissionsService } from 'ngx-permissions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calidadweb';
  public loginstatus: any;

  constructor(
    private permissionsService: NgxPermissionsService,
    private generalService : GeneralService,

  ) {
    this.loginstatus  = localStorage.getItem("loginstatus");
  }

  permisos() : void
  {
    if (this.loginstatus == 'true') {
      let currper = GeneralService.LOGINDATA['vistaproyectos'];
      try {
        let permissions = [currper];
        this.permissionsService.loadPermissions(permissions);
        console.log(permissions)
      } catch (error) {
        localStorage.clear();
        window.location.href = '#/inicio';
      }
      
    }
  }
 
}
