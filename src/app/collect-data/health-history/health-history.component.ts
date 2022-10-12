import { FichaNutricionalService } from 'src/app/services/fucha-nutricional.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-history',
  templateUrl: './health-history.component.html',
  styleUrls: ['./health-history.component.scss'],
})
export class HealthHistoryComponent implements OnInit {
  antesedenteFrm: FormGroup;
  isshowMedic = true;
  isshowLes = true;
  submited = false;
  constructor(
    public router: Router,
    private loadingCtrl: LoadingController,
     private toastCtrl: ToastController,
     private apiAntecedente: FichaNutricionalService
    ) {
    this.antesedenteFrm = new FormGroup({
      medicamento: new FormControl('', Validators.required),
      docis: new FormControl(''),
      lesion: new FormControl('', Validators.required),
      deslesion: new FormControl(''),
      enfermendad: new FormControl(''),
    });
  }

  ngOnInit() {}
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() {
    return this.antesedenteFrm.value;
  }

  changeMedicamento(e){
    console.log(e.target.value);
    if(e.target.value === 'si'){
     this.isshowMedic = true;
    }else{
      this.isshowMedic= false;
    }
  }

  changeLes(e){
    console.log(e.target.value);
    if(e.target.value === 'si'){
     this.isshowLes = true;
    }else{
      this.isshowLes= false;
    }
  }
  async ngSubmit() {
    this.submited = true;
    const loading = await this.loadingCtrl.create({message: 'Espere un momento por favor'});
    if ( this.antesedenteFrm.invalid){
      return true;
    }
    await loading.present();
    const valueForm = this.antesedenteFrm.value;
    const data = {
      medicanmento: valueForm.medicamento,
      dosis_medicamento: valueForm.docis,
      lesiones: valueForm.lesion,
      parte_lesion: valueForm.deslesion,
      enfermedad_cronica: valueForm.enfermendad,
      ficha_nutricional:localStorage.getItem('uid_ficha')
    };
    console.log(data);
    this.apiAntecedente.registroAntecendete(data).subscribe(async (response: any) => {
      const toastSuccess = await this.toastCtrl.create({message: `Exitoso`, duration: 2500});
      await toastSuccess.present();
     // this.router.navigate(['home/sky']);
      await  this.router.navigate(['collect/lifesty']);

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

}
