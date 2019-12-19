import { Component, OnInit } from '@angular/core';
import { AprobacionService } from "src/services/aprobacion.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  public data : any = [];
  ngOnInit()
  {
    this.data = JSON.parse(localStorage.getItem("logindata"));
    console.log(this.data);
    var a = this.data.id;
    
  }
 


  logout()
  {
    localStorage.clear();
    window.location.href = '';
  }
}
