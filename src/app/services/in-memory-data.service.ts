import { Food } from './../core/interfaces/food';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const foods = [
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
    return {foods};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(foods: Food[]): number {
    return foods.length > 0 ? Math.max(...foods.map(food => food.id)) + 1 : 11;
  }
}
