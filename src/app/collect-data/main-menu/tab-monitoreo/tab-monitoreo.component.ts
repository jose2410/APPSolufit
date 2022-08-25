import { IonInfiniteScroll } from '@ionic/angular';

import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-tab-monitoreo',
  templateUrl: './tab-monitoreo.component.html',
  styleUrls: ['./tab-monitoreo.component.scss'],
})
export class TabMonitoreoComponent implements AfterViewInit  {
  @ViewChild('lineCanvas') lineCanvas: ElementRef | undefined;
  @ViewChild('lineCanvas2') lineCanvas2: ElementRef | undefined;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  lineChart: any;
  lineChart2: any;


  enableInfinteScroll = true;
  page = 1;

  constructor() { }

  ngAfterViewInit(): void {
    this.lineChartMethod();
  }

  loadData($event: any) {
    setTimeout(() => {
      this.page = this.page + 1;
      /*this.planesAsync.push(
        ...this.planes.slice(50 * this.page, 50 * this.page + 50)
      );*/

      $event.target.complete();
    }, 750);
  }
  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'Jul',
          'Aug',
          'Sep',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Sell per week',
          //  lineTension: 0.2,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [10, 15, 20, 25, 30],
            spanGaps: false,
          },
        ],
      },
    });
    this.lineChart2 = new Chart(this.lineCanvas2?.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'Jul',
          'Aug',
          'Sep',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Sell per week',
          //  lineTension: 0.2,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [10, 15, 20, 25, 30],
            spanGaps: false,
          },
        ],
      },
    });

  }
}
