import { CardPlanDetailComponent } from './card-plan-detail/card-plan-detail.component';
import { CardPlanComponent } from './card-plan/card-plan.component';
import { TabPlanComponent } from './tab-plan.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabPlanRoutingModule } from './tab-plan-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabPlanRoutingModule
  ],
  declarations: [TabPlanComponent,CardPlanComponent,CardPlanDetailComponent]
})
export class TabPlanModule {}
