import { FichaNutricionalService } from 'src/app/services/fucha-nutricional.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  questFrm: FormGroup;
  submited = false;
  ficha: any = [];
  constructor(
    public router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fichaService: FichaNutricionalService
    ) {
      this.questFrm = new FormGroup({
        balanzacasa: new FormControl('',Validators.required),
        balanzaalimento: new FormControl('',Validators.required),
        accesorios: new FormControl('',Validators.required),
        indicar: new FormControl('',Validators.required),
      });
    }

  ngOnInit() {
    this.getFichaByPacienteId();
  }
 go(){
  this.router.navigate(['main/plan']);
 }

 getFichaByPacienteId(){
  this.fichaService.getFichaById(localStorage.getItem('uid_ficha')).subscribe((response: any)=>{
    this.ficha= response.ficha;
  });
}

async updateFicha(){
  this.submited = true;
   const loading = await this.loadingCtrl.create({message: 'Espere un momento por favor'});
   if ( this.questFrm.invalid){
     return true;
   }
   await loading.present();
   const valueForm = this.questFrm.value;
  const datas = {
    fecha_registro:this.ficha.fecha_registro,
    objetivo:this.ficha.objetivo,
    nivel_actividad: this.ficha.nivel_actividad,
    taza_actividad: this.ficha.taza_actividad,
    imc_inicial: this.ficha.imc_inicial,
    imc_actual:this.ficha.imc_actual,
    peso_inicial:  this.ficha.peso_inicial,
    peso_actual:this.ficha.peso_actual ,
    perimetro_abdominal_inicial:this.ficha.perimetro_abdominal_inicial,
    perimetro_abdominal_actual: this.ficha.perimetro_abdominal_actual,
    talla: this.ficha.talla,
    balanza_persona: valueForm.balanzacasa,
    balanza_alimentos: valueForm.balanzaalimento,
    accesorios_ejercicio: valueForm.accesorios,
    descripcion_accesorio_ejercicio: valueForm.indicar,
    paciente: this.ficha.paciente,
    // eslint-disable-next-line no-underscore-dangle
    _id: this.ficha._id
  };

  this.fichaService.actualizarFicha(datas).subscribe((response: any)=>{
    // eslint-disable-next-line no-underscore-dangle
   this.registroEstado();
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

registroEstado(){
  const data={
    is_register_ficha:true,
    usuario: localStorage.getItem('uid_user')
  };
  this.fichaService.registroEstado(data).subscribe((response: any)=>{
    this.router.navigate(['main/plan']);
  });
}

back(){
  this.router.navigate(['collect/ditary']);
}

}
