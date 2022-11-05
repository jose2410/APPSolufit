import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LogoComponent } from './../components/logo/logo.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SwiperComponent } from '../components/swiper/swiper.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    AuthRoutingModule
  ],
  declarations: [LoginComponent,RegisterComponent,LogoComponent]
})
export class AuthModule {}
