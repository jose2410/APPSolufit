import { TabMonitoreoComponent } from './tab-monitoreo.component';
import { TabMonitoreoRoutingModule } from './tab-monitoreo-routing.module';
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
    TabMonitoreoRoutingModule
  ],
  declarations: [TabMonitoreoComponent]
})
export class TabMonitoreoModule {}
