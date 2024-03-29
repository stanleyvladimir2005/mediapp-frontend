import { LoginService } from '../../_service/login.service';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MenuService} from "../../_service/menu.service";
import '../../../assets/login-animation.js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user_name: string;
  password: string;
  message: string = "";
  error: string = "";

  constructor(private loginService: LoginService, private router: Router, private menuService: MenuService) { }

  ngOnInit() {
  }


  login() {
    this.loginService.login(this.user_name, this.password).subscribe(data => {
      if (data) {

        const helper = new JwtHelperService();
        sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

        let token = sessionStorage.getItem(environment.TOKEN_NAME);
        let decodedToken = helper.decodeToken(token);
        console.log(decodedToken);

        this.menuService.findByUser(decodedToken.user_name).subscribe(data => {
          this.menuService.menuChange.next(data);
          this.router.navigate(['/pages/dashboard']);
        });

      }
    });
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }
}
