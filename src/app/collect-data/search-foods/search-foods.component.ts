import { Food } from './../../core/interfaces/food';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-search-foods',
  templateUrl: './search-foods.component.html',
  styleUrls: ['./search-foods.component.scss'],
})
export class SearchFoodsComponent implements OnInit {
  lists = [
    {
      id: 1,
      namefood: 'pollo',
      imgsvg: 'svg',
      flag: 'proteina',
    },
    {
      id: 2,
      namefood: 'carne',
      imgsvg: 'svg',
      flag: 'proteina',
    },
    {
      id: 3,
      namefood: 'pescado',
      imgsvg: 'svg',
      flag: 'proteina',
    },
    {
      id: 4,
      namefood: 'arroz',
      imgsvg: 'svg',
      flag: 'carbohidratos',
    },
    {
      id: 5,
      namefood: 'papa',
      imgsvg: 'svg',
      flag: 'carbohidratos',
    },
    {
      id: 6,
      namefood: 'camote',
      imgsvg: 'svg',
      flag: 'carbohidratos',
    }
  ];

  foods: Food[];
  foodSeleccionados: Food;
  search: any = '';

  constructor(public router: Router) {
    this.foods = this.lists;
   }

  ngOnInit() {
  console.log(this.foodsFiltradas());
  }

  go(){
    this.router.navigate(['collect/quest']);
  }

  foodsFiltradas(): Food[] {
    return this.foods.sort((a,b)=>{
      if (a.flag > b.flag) {
        return 1;
      }
      if (a.flag < b.flag) {
        return -1;
      }
      return 0;
    }).filter((e: Food) => e.flag.toLowerCase().includes(this.search.toLowerCase()));
  }

  setEspecialidad($event: any) {
    this.foodSeleccionados = this.foods.find(e => e.flag === $event);
  }
}
