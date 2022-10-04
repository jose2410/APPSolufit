import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
//import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FichaNutricionalService {

  constructor(private http: HttpClient) {
  }


  registroFicha(data) {
    //TODO
    return this.http.post(environment.api_url + 'ficha', data);
  }

  getFichaByPacienteId(uid) {
    return this.http.get(environment.api_url + `ficha/paciente/${uid}`);
  }

  actualizarFicha( data: any ) {
    return this.http.put( environment.api_url + `ficha/${ data._id }`, data);
  }
}
