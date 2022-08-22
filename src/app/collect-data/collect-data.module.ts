import { QuestionsComponent } from './questions/questions.component';
import { DietaryIndicatorComponent } from './dietary-indicator/dietary-indicator.component';
import { SearchFoodsComponent } from './search-foods/search-foods.component';
import { FoodsComponent } from './foods/foods.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { LifestyleComponent } from './lifestyle/lifestyle.component';
import { HealthHistoryComponent } from './health-history/health-history.component';
import { ImcComponent } from './imc/imc.component';
import { LogoComponent } from './../components/logo/logo.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ColletDataLayout } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectDataPageRoutingModule } from './collect-data-routing.module';

import { CollectDataPage } from './collect-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CollectDataPageRoutingModule
  ],
  declarations: [
    CollectDataPage,
    ColletDataLayout,
    PersonalInfoComponent,
    LogoComponent,
    ImcComponent,
    HealthHistoryComponent,
    LifestyleComponent,
    IndicatorComponent,
    FoodsComponent,
    SearchFoodsComponent,
    DietaryIndicatorComponent,
    QuestionsComponent
  ]
})
export class CollectDataPageModule {}
