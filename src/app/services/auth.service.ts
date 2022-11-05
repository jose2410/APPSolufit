import { Router } from '@angular/router';
import { UsuarioResponse } from './../core/interfaces/usuarioResponse';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from './../core/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
//import { environment } from 'src/environments/environment.prod';
declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth2: any;
  public usuario: UsuarioResponse;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
  }

  login(user: User) {
    return this.http.post(environment.api_url + 'login', user);
  }
  // Login con google
  loginGoogle( token ) {
    return this.http.post(environment.api_url + `/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {
                    this.guardarLocalStorage( resp.token, resp.menu );
                  })
                );

  }

  register(data) {
    //TODO
    return this.http.post(environment.api_url + 'usuarios', data);
  }

  getEstadoUser(id) {
    return this.http.get(environment.api_url + `estado/${id}`);
  }


  googleInit() {

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          client_id: '215806290372-i9ojchk36ckdcdgg9oc31jcl4h7sm883.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });

  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });

  }

  validarToken(): Observable<boolean> {

    return this.http.get(environment.api_url +`/login/renew`).pipe(
      map( (resp: any) => {
        const { email, google, role,  uid } = resp.usuario;
        this.usuario = new UsuarioResponse(  email, google, role,  uid  );
        this.guardarLocalStorage( resp.token, resp.menu );

        return true;
      }),
      catchError( error => of(false) )
    );

  }

  guardarLocalStorage( token: string, menu: any ) {

    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );

  }

  getPaciente(id: any){
    return this.http.get(environment.api_url + `pacientes/usuario/${id}`);
  }
  getPlan(id: any){
    return this.http.get(environment.api_url + `plan/${id}`);
  }

  actulizarPaciente(data){
    return this.http.put( environment.api_url + `pacientes/${ data._id }`, data);
  }
  getHorario(id: any){
    return this.http.get(environment.api_url + `horario/${id}`);
  }
}
