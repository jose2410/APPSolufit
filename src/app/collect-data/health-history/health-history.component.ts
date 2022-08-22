import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-history',
  templateUrl: './health-history.component.html',
  styleUrls: ['./health-history.component.scss'],
})
export class HealthHistoryComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {}
  go(){
    this.router.navigate(['collect/lifesty']);
      }

}
