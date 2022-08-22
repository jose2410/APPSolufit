import { MainMenuComponent } from './main-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainMenuRoutingModule } from './main-menu-routing.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MainMenuRoutingModule
  ],
  declarations: [MainMenuComponent]
})
export class MainMenuModule {}
