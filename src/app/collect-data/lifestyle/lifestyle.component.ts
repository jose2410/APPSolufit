import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.scss'],
})
export class LifestyleComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {}
  go(){
    this.router.navigate(['collect/indicator']);
      }

}
