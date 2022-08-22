import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imc',
  templateUrl: './imc.component.html',
  styleUrls: ['./imc.component.scss'],
})
export class ImcComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {}
  go(){
    this.router.navigate(['collect/health']);
      }
}
