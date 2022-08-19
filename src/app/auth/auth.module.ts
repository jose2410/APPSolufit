import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SwiperComponent } from './../swiper/swiper.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthRoutingModule
  ],
  declarations: [LoginComponent,RegisterComponent]
})
export class AuthModule {}
