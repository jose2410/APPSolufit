import { ActivityComponent } from './activity.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityRoutingModule } from './activity-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityRoutingModule
  ],
  declarations: [ActivityComponent,LogoComponent]
})
export class ActivityModule {}
