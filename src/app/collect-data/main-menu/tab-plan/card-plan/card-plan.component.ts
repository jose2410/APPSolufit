import { Router } from '@angular/router';
import { Plan } from './../../../../core/interfaces/plan';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-plan',
  templateUrl: './card-plan.component.html',
  styleUrls: ['./card-plan.component.scss'],
})
export class CardPlanComponent implements OnInit {
  @Input() plan: Plan | any;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('agendar') showAgendarCita = false;
  sede: string;
  iPlan: Plan;

  constructor(public router: Router) { }

  ngOnInit() {}
  goDetail(){
this.router.navigate(['main/plan/footdetail']);
  }
}
