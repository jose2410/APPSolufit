import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-plan-detail',
  templateUrl: './card-plan-detail.component.html',
  styleUrls: ['./card-plan-detail.component.scss'],
})
export class CardPlanDetailComponent implements OnInit {
  constructor(public router: Router) { }

  ngOnInit() {}
  goToplan(){
this.router.navigate(['main/plan']);
  }
}
