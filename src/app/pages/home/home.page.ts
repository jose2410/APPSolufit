import { Objectivo } from './../../core/interfaces/objetivo';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  objetivoSeleccionada: Objectivo;

  lists: Objectivo[] = [
    {
      id: 1,
      name: 'Perder peso'
    },
    {
      id: 2,
      name: 'Mantener Peso'
    },
    {
      id: 3,
      name: 'Ganar Masa Moscular'
    }
  ];
  constructor(public router: Router) { }

  ngOnInit() {
  }

  selectObjetivo(list) {
    this.objetivoSeleccionada = this.lists.find(s => s.id === list);
  }
  go(){
  this.router.navigate(['collect']);
  }
}
