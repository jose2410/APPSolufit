import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {}
 go(){
  this.router.navigate(['collect/search']);
 }
}
