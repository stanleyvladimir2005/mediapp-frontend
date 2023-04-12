import { Component, OnInit } from '@angular/core';
import {Menu} from "../../_model/menu";
import {LoginService} from "../../_service/login.service";
import {MenuService} from "../../_service/menu.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  menus: Menu[];

  constructor(public loginService : LoginService, private menuService : MenuService){
  }

  ngOnInit(){
    this.menuService.menuChange.subscribe(data => {
      this.menus = data;
    });
  }

  logout(){
    this.loginService.logout();
  }

}
