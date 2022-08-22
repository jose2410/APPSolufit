import { IonInfiniteScroll } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab-monitoreo',
  templateUrl: './tab-monitoreo.component.html',
  styleUrls: ['./tab-monitoreo.component.scss'],
})
export class TabMonitoreoComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  enableInfinteScroll = true;
  page = 1;
  constructor() { }

  ngOnInit() {}

  loadData($event: any) {
    setTimeout(() => {
      this.page = this.page + 1;
      /*this.planesAsync.push(
        ...this.planes.slice(50 * this.page, 50 * this.page + 50)
      );*/

      $event.target.complete();
    }, 750);
  }
}
