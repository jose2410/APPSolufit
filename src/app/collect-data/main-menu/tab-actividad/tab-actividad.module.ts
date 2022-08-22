import { TabActividadComponent } from './tab-actividad.component';
import { TabActividadRoutingModule } from './tab-actividad-routing.module';

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
    TabActividadRoutingModule
  ],
  declarations: [TabActividadComponent]
})
export class TabActividadModule {}
