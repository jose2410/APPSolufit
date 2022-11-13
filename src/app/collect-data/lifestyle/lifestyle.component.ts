import { FichaNutricionalService } from 'src/app/services/fucha-nutricional.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.scss'],
})
export class LifestyleComponent implements OnInit {
  estiloFrm: FormGroup;
  isshowEjercicio = true;
  isshowAlcol = true;
  isshowCafe = true;
  isshowDulce = true;
  submited = false;
  constructor(
    public router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private apiEstilo: FichaNutricionalService
    ) {
    this.estiloFrm = new FormGroup({
      ejercicio: new FormControl('', Validators.required),
      tipo: new FormControl(''),
      frecuenciaEjercicio: new FormControl(''),
      duracionEjercicio: new FormControl(''),
      desdeTiempo: new FormControl(''),
      alcohol: new FormControl('', Validators.required),
      frecuenciaAlcohol: new FormControl(''),
      cantidadAlcohol: new FormControl(''),
      cafe: new FormControl('', Validators.required),
      frecuenciaCafe: new FormControl(''),
      cantidadCafe: new FormControl(''),
      dulces: new FormControl('', Validators.required),
      frecuenciaDulces: new FormControl(''),
      cantidadDulces: new FormControl(''),
      bebidas: new FormControl('', Validators.required),
    });
   }

  ngOnInit() {}

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() {
    return this.estiloFrm.value;
  }

  changeEjercicio(e){
    console.log(e.target.value);
    if(e.target.value === 'si'){
     this.isshowEjercicio = true;
    }else{
      this.isshowEjercicio= false;
    }
  }

  changeAlcohol(e){
    console.log(e.target.value);
    if(e.target.value === 'si'){
     this.isshowAlcol = true;
    }else{
      this.isshowAlcol= false;
    }
  }

  changeCafe(e){
    console.log(e.target.value);
    if(e.target.value === 'si'){
     this.isshowCafe = true;
    }else{
      this.isshowCafe= false;
    }
  }

  changeDulce(e){
    console.log(e.target.value);
    if(e.target.value === 'si'){
     this.isshowDulce = true;
    }else{
      this.isshowDulce= false;
    }
  }

  async ngSubmit() {
    this.submited = true;
    const loading = await this.loadingCtrl.create({message: 'Espere un momento por favor'});
    if ( this.estiloFrm.invalid){
      return true;
    }
    await loading.present();
    const valueForm = this.estiloFrm.value;
    const data = {
     ejercicio: valueForm.ejercicio,
     tipo_ejercicio: valueForm.tipo,
     frecuencia_ejercicio: valueForm.frecuenciaEjercicio,
     duracion_ejercicio: valueForm.duracionEjercicio,
     antiguedad_ejercicio: valueForm.desdeTiempo,
     alcohol: valueForm.alcohol,
     frecuencia_alcohol: valueForm.frecuenciaAlcohol,
     cantidad_alcohol: valueForm.cantidadAlcohol,
     cafe: valueForm.cafe,
     frecuencia_cafe: valueForm.frecuenciaCafe,
     cantidad_cafe: valueForm.cantidadCafe,
     dulce: valueForm.dulces,
     frecuencia_dulce: valueForm.frecuenciaDulces,
     cantidad_dulce: valueForm.cantidadDulces,
     bebidas_asucaradas: valueForm.bebidas,
     ficha_nutricional:localStorage.getItem('uid_ficha')
    };
    console.log(data);
    this.apiEstilo.registrEstiloVida(data).subscribe(async (response: any) => {
      const toastSuccess = await this.toastCtrl.create({message: `Exitoso`, duration: 2500});
      await toastSuccess.present();
     // this.router.navigate(['home/sky']);
      await  this.router.navigate(['collect/indicator']);

    }, async (error) => {
      console.log(error);
      const er = error.error;
      const toastError = await this.toastCtrl.create({message: `Error`, duration: 2500});
      await toastError.present();
      await loading.dismiss();
    }, () => {
      loading.dismiss();
    });
  }

  back(){
    this.router.navigate(['collect/health']);
  }

}
