import { environment } from './../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private loadingCtrl: LoadingController) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes(environment.api_url)) {
      const token: string = localStorage.getItem('token');
      let request = req;
      if (token) {
        request = req.clone({
          setHeaders: {
            'x-token': `${token}`
          }
        });
      }
      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            localStorage.removeItem('token');
            this.loadingCtrl.dismiss();
            this.router.navigateByUrl('/auth/login');
          }
          return throwError(err);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
