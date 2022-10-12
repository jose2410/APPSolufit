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

  getFichaById(id) {
    return this.http.get(environment.api_url + `ficha/${id}`);
  }

  getFichaByPacienteId(uid) {
    return this.http.get(environment.api_url + `ficha/paciente/${uid}`);
  }

  actualizarFicha( data: any ) {
    return this.http.put( environment.api_url + `ficha/${ data._id }`, data);
  }

  // Antecedentes Salud

  registroAntecendete(data) {
    //TODO
    return this.http.post(environment.api_url + 'antecedente', data);
  }

  // Estilo Vida
  registrEstiloVida(data) {
    //TODO
    return this.http.post(environment.api_url + 'estilo', data);
  }

  // idicador dietetico

  registrIndicador(data) {
    //TODO
    return this.http.post(environment.api_url + 'idicador', data);
  }

  actualizarIndicador( data: any ) {
    return this.http.put( environment.api_url + `idicador/${ data._id }`, data);
  }

  getIndicadoreId(id) {
    return this.http.get(environment.api_url + `idicador/${id}`);
  }

  //Registro estado

  registroEstado(data) {
    //TODO
    return this.http.post(environment.api_url + 'estado', data);
  }

}
