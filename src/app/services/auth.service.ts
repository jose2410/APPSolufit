import { environment } from './../../environments/environment';
import { User } from './../core/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user: User) {
    return this.http.post(environment.api_url + 'login', user);
  }

}
