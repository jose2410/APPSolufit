import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-collectdata-layout',
  templateUrl: './layout.component.html',
  styles: [`
     .reservas {
      height: 100vh;
      width: 100%;
      background: var(--reservas-background-color);
      display: flex;
      justify-content: space-between;
      padding: 10px;
    }
    .reservas-panel {
      width: 100%;
      height: calc((100% - 15vh));
      background: var(--reservas-background-color-panel);
      /*position: absolute;
      border-radius: 1.5rem 1.5rem 0 0;
      bottom: 0;
      box-shadow: 0 4px 10px var(--ion-color-dark);*/
    }
    .btn-back {
      left: 1rem;
      top: calc(var(--ion-safe-area-top) + 1rem);
    }
  `]
})

export class ColletDataLayout implements OnInit {
  image: string;


  constructor(private navCtrl: NavController, private router: Router) {
  }

  ngOnInit() {
  }

  back() {
  }
}
