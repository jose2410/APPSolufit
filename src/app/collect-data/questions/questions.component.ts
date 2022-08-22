import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {}
 go(){
  this.router.navigate(['main/plan']);
 }
}
