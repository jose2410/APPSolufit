import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { FichaNutricionalService } from './../../services/fucha-nutricional.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dietary-indicator',
  templateUrl: './dietary-indicator.component.html',
  styleUrls: ['./dietary-indicator.component.scss'],
})
export class DietaryIndicatorComponent implements OnInit {
  indicadorFrm: FormGroup;
  submited = false;
  indicadores: any =[];
  constructor(public router: Router,private indicadorService: FichaNutricionalService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
      this.indicadorFrm = new FormGroup({
        preferencia: new FormControl('',),
        desagradan: new FormControl('')
      });
    }

  ngOnInit() {
    this.getFichaByPacienteId();
  }
 go(){
  this.router.navigate(['collect/quest']);
 }

 getFichaByPacienteId(){
  this.indicadorService.getIndicadoreId(localStorage.getItem('uid_indicador')).subscribe((response: any)=>{
   this.indicadores = response.indicador;
   console.log(response);
  });
}

async updateFicha(){
  this.submited = true;
  const loading = await this.loadingCtrl.create({message: 'Espere un momento por favor'});
  await loading.present();
  const valueForm = this.indicadorFrm.value;
  const datas = {
    alergia: this.indicadores.alergia,
    alimentos_alergia:this.indicadores.alimentos_alergia,
    carbohidratos:this.indicadores.carbohidratos,
    comidas_desagrada:valueForm.preferencia,
    comindas_preferencia:valueForm.desagradan,
    descripcion_suplemento:this.indicadores.descripcion_suplemento,
    ficha_nutricional:this.indicadores.ficha_nutricional,
    frutos:this.indicadores.frutos,
    grasas:this.indicadores.grasas,
    lacteos:this.indicadores.lacteos,
    proteina:this.indicadores.proteina,
    suplemento:this.indicadores.suplemento,
    _id:this.indicadores._id
  };
console.log(datas);
  this.indicadorService.actualizarIndicador(datas).subscribe((response: any)=>{
    // eslint-disable-next-line no-underscore-dangle
    this.router.navigate(['collect/quest']);
  }, async (error) => {
    console.log(error);
    const er = error.error;
    const toastError = await this.toastCtrl.create({message: er.msg, duration: 2500});
    await toastError.present();
    await loading.dismiss();
  }, () => {
    loading.dismiss();
  });
}

back(){
  this.router.navigate(['collect/search']);
}

}
