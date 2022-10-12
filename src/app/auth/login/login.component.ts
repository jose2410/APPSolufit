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
    console.log(this.f);
    this.apiServce.login(this.f).subscribe(async (response: AuthResponse) => {
      const user = response.user;
      console.log('reponse ', response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('uid_user', response.uid);
      const toastSuccess = await this.toastCtrl.create({message: `Bienvenido ${this.f.email}`, duration: 2500});
      await toastSuccess.present();
     // this.router.navigate(['home/sky']);
    //  await this.router.navigate(['/home/sky'], {replaceUrl: true, queryParams: {auth: true}});
    this.getEstadoUser(response.uid);
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

  getEstadoUser(user){
    this.apiServce.getEstadoUser(user).subscribe(( response: any ) =>{
      console.log('erro 001',response);
      if(response.estado.is_register_ficha ){
        //this.router.navigate(['/home/sky']);
        this.router.navigate(['main/plan']);
      }else{
        //this.router.navigate(['main/plan']);
        this.router.navigate(['/home/sky']);
      }
    }, async (error) => {
      console.log(error);
      const er = error.error;
      if(!error.error.ok){
        this.router.navigate(['/home/sky']);
      }
      const toastError = await this.toastCtrl.create({message: `Usuario sin ficha`, duration: 2500});
      await toastError.present();
     // await loading.dismiss();
    }, () => {
     // loading.dismiss();
    });
  }
  goRegister(){
    this.router.navigate(['/auth/register']);
  }
}
