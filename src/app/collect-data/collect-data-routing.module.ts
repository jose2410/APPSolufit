import { QuestionsComponent } from './questions/questions.component';
import { DietaryIndicatorComponent } from './dietary-indicator/dietary-indicator.component';
import { SearchFoodsComponent } from './search-foods/search-foods.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { LifestyleComponent } from './lifestyle/lifestyle.component';
import { HealthHistoryComponent } from './health-history/health-history.component';
import { ImcComponent } from './imc/imc.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectDataPage } from './collect-data.page';

const routes: Routes = [
  {
    path: '',
    component: CollectDataPage,
    children: [
      {
        path: '',
        redirectTo: 'personalinfo',
        pathMatch: 'full'
      },
      {
        path: 'personalinfo',
        component: PersonalInfoComponent
      },
      {
        path: 'imc',
        component: ImcComponent
      },
      {
        path: 'health',
        component: HealthHistoryComponent
      },
      {
        path: 'lifesty',
        component: LifestyleComponent
      },
      {
        path: 'indicator',
        component: IndicatorComponent
      }
      ,
      {
        path: 'search',
        component: SearchFoodsComponent
      },
      {
        path: 'ditary',
        component:DietaryIndicatorComponent
      },
      {
        path: 'quest',
        component: QuestionsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectDataPageRoutingModule {}
