import { Horario } from './../../../core/interfaces/horario';
import { Plan } from './../../../core/interfaces/plan';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab-plan',
  templateUrl: './tab-plan.component.html',
  styleUrls: ['./tab-plan.component.scss'],
})
export class TabPlanComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  planes = [
    {
      name: 'Desayuno',
      img: '',
      descripcion: 'Smoothie de manzana',
      kcal: '829 kcal'
    },
    {
      name: 'Media mañana',
      img: '',
      descripcion: 'Fruta',
      kcal: '151 kcal'
    },
    {
      name: 'Almuerzo',
      img: '',
      descripcion: 'Pollo al horno con puré',
      kcal: '755 kcal'
    },
    {
      name: 'Media tarde',
      img: '',
      descripcion: 'Fruta',
      kcal: '829 kcal'
    },
    {
      name: 'Cena',
      img: '',
      descripcion: 'Sandwich Club',
      kcal: '151 kcal'
    },
    {
      name: 'Actividad',
      img: '',
      descripcion: 'Registra tu actividad',
      kcal: 'Medidas'
    }
  ];

  planesAsync: Plan[] = [];
  page = 1;
  enableInfinteScroll = true;


  constructor() {
    this.planesAsync=this.planes;
   }

  ngOnInit() {}

  loadData($event: any) {
    setTimeout(() => {
      this.page = this.page + 1;
      this.planesAsync.push(
        ...this.planes.slice(50 * this.page, 50 * this.page + 50)
      );

      $event.target.complete();
    }, 750);
  }

}
