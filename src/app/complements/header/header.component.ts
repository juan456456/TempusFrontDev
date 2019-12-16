import { Component, OnInit } from '@angular/core';

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
  }
  logout()
  {
    localStorage.clear();
    window.location.href = '';
  }
}
