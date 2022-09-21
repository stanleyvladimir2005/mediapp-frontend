import { MenuService } from '../../_service/menu.service';
import { LoginService } from '../../_service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario!: string;
  clave!: string;
  mensaje: string = "";
  error: string = "";

  constructor(private loginService: LoginService, private menuService: MenuService) { }

  ngOnInit() {
  }

  iniciarSesion(){}


  ngAfterViewInit() {
    (window as any).initialize();
  }

}
