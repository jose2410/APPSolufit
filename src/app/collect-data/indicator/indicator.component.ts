import { FichaNutricionalService } from './../../services/fucha-nutricional.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent implements OnInit {
  indicadorFrm: FormGroup;
  submited = false;
  constructor(
    public router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private indicadorService: FichaNutricionalService
    ) {
      this.indicadorFrm = new FormGroup({
        alergia: new FormControl('',Validators.required),
        alimentos: new FormControl(''),
        suplemento: new FormControl('',Validators.required),
        suplementoses: new FormControl(''),
      });
     }

  ngOnInit() {}

 async ngSubmit()
 {
   this.submited = true;
   const loading = await this.loadingCtrl.create({message: 'Espere un momento por favor'});
   if ( this.indicadorFrm.invalid){
     return true;
   }
   await loading.present();
   const valueForm = this.indicadorFrm.value;
   const data ={
     alergia: valueForm.alergia,
     alimentos_alergia: valueForm.alimentos,
     suplemento:valueForm.suplemento,
     descripcion_suplemento:  valueForm.suplementoses,
     proteina:'' ,
     carbohidratos: '',
     grasas: '',
     lacteos: '',
     frutos: '',
     comindas_preferencia: '',
     comidas_desagrada: '',
     ficha_nutricional:localStorage.getItem('uid_ficha')
   };
   this.indicadorService.registrIndicador(data).subscribe(async (response: any) => {
    // eslint-disable-next-line no-underscore-dangle
    localStorage.setItem('uid_indicador',response.indicador._id);
     // eslint-disable-next-line no-underscore-dangle
     //localStorage.setItem('uid_ficha', response.fichas._id);
     this.router.navigate(['collect/search']);
   }, async (error) => {
     console.log(error);
     const er = error.error;
     const toastError = await this.toastCtrl.create({message: er.msg, duration: 2500});
     await toastError.present();
     await loading.dismiss();
   }, () => {
     loading.dismiss();
   });
  //
 }
}
