import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) {
  }

  registerPaciente(data){
    return this.http.post(environment.api_url + 'pacientes', data);
  }

  getPacienteByUserId(uid) {
    return this.http.get(environment.api_url + `pacientes/usuario/${uid}`);
  }

}
