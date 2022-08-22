import { TabMasComponent } from './tab-mas.component';
import { TabMasRoutingModule } from './tab-mas-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabMasRoutingModule
  ],
  declarations: [TabMasComponent]
})
export class TabMasModule {}
