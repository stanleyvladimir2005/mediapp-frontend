import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = `${environment.HOST}/oauth/token`

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: string, contrasena: string) {
  }

  cerrarSesion() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    this.http.get(`${environment.HOST}/tokens/anular/${token}`).subscribe(() => {
      sessionStorage.clear();
      this.router.navigate(['login']);
    });
  }
}
