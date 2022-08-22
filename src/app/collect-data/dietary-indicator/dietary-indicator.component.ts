import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dietary-indicator',
  templateUrl: './dietary-indicator.component.html',
  styleUrls: ['./dietary-indicator.component.scss'],
})
export class DietaryIndicatorComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {}
 go(){
  this.router.navigate(['collect/quest']);
 }

}
