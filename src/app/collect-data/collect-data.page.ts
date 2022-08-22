import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collect-data',
  templateUrl: './collect-data.page.html',
  styleUrls: ['./collect-data.page.scss'],
})
export class CollectDataPage implements OnInit {

  constructor(private navCtrl: NavController) {
  }

  ngOnInit() {
  }
  back() {
    this.navCtrl.pop();
  }
}
