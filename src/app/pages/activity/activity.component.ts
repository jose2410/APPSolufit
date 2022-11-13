import { Router } from '@angular/router';
import { Actvitiy } from './../../core/interfaces/activity';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  objetivoSeleccionada: Actvitiy;

  lists: Actvitiy[] = [
    {
      id: 1,
      name: 'Ningun Ejercicio',
      taza:'1.2',
      description: ''
    },
    {
      id: 2,
      name: 'Ejercicio Lijero',
      taza:'1.375',
      description: ''
    },
    {
      id: 3,
      name: 'Ejercicio Moderado',
      taza:'1.55',
      description: ''
    },
    {
      id: 4,
      name: 'Ejercicio Fuerte',
      taza:'1.725',
      description: ''
    }
  ];
  constructor(private router: Router) { }

  ngOnInit() {}
  selectObjetivo(list) {
    console.log(list);
    this.objetivoSeleccionada = this.lists.find(s => s.id === list);
  }
  go(dato){
  localStorage.setItem('nameactiviy',dato.name);
  localStorage.setItem('taza',dato.taza);
   this.router.navigate(['collect']);
  }
  back(){
    this.router.navigate(['home/sky']);
  }
}
