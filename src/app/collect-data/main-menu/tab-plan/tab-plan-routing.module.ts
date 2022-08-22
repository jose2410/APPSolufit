import { CardPlanDetailComponent } from './card-plan-detail/card-plan-detail.component';
import { TabPlanComponent } from './tab-plan.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: TabPlanComponent
  },
  {
    path: 'footdetail',
    component: CardPlanDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabPlanRoutingModule {}
