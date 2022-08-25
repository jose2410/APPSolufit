import { Food } from './../../core/interfaces/food';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';



@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss'],
})
export class FoodsComponent implements OnInit {
  @Input() food: Food;
  @Input() isActive = false;
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClick: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log(this.food);
  }

  click() {
   // this.onClick.emit(this.especialidad.codigo);
}
}
