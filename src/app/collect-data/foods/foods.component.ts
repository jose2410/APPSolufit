import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';



@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss'],
})
export class FoodsComponent implements OnInit {
 // @Input() especialidad: Especialidad;
  @Input() isActive = false;

 // @Output() onClick: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  click() {
   // this.onClick.emit(this.especialidad.codigo);
}
}
