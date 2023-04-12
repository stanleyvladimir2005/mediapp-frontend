import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../_service/menu.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: string;

  constructor(
    private menuService: MenuService
  ){}

  ngOnInit(): void {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN_NAME));
    this.username = decodedToken.user_name;

    this.menuService.findByUser(this.username).subscribe(data => {
      this.menuService.setMenuChange(data);
    });
  }

}
