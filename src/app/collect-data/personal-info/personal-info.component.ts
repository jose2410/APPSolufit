import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {

  constructor(public router: Router) {

  }

  ngOnInit() {}

  go(){
this.router.navigate(['collect/imc']);
  }
}
