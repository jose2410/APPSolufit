import { AuthResponse } from './../../core/interfaces/authResponse';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword = false;
  loginFrm: FormGroup;
  submited = false;
  constructor(
    public router: Router,
     private loadingCtrl: LoadingController,
     private toastCtrl: ToastController,
     private apiServce: AuthService) {
    this.loginFrm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {

  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() {
    return this.loginFrm.value;
  }


  async ngSubmit() {
    this.submited = true;
    const loading = await this.loadingCtrl.create({message: 'Espere un momento por favor'});
    if ( this.loginFrm.invalid){
      return true;
    }
    await loading.present();
    this.apiServce.login(this.f).subscribe(async (response: AuthResponse) => {
      const user = response.user;

      localStorage.setItem('token', response.token);

      const toastSuccess = await this.toastCtrl.create({message: `Bienvenido ${user.email}`, duration: 2500});
      await toastSuccess.present();
     // this.router.navigate(['home/sky']);
      await this.router.navigate(['/home/sky'], {replaceUrl: true, queryParams: {auth: true}});

    }, async (error) => {
      console.log(error);
      const er = error.error;
      const toastError = await this.toastCtrl.create({message: `Usuario o contraseña errada`, duration: 2500});
      await toastError.present();
      await loading.dismiss();
    }, () => {
      loading.dismiss();
    });
  }

  goRegister(){
    this.router.navigate(['/auth/register']);
  }
}
