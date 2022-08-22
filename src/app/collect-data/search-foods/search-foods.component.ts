import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-foods',
  templateUrl: './search-foods.component.html',
  styleUrls: ['./search-foods.component.scss'],
})
export class SearchFoodsComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {}

  go(){
    this.router.navigate(['collect/quest']);
  }

}
