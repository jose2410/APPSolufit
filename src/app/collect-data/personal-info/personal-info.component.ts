import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { PacienteResponse } from './../../core/interfaces/pacienteResponse';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PacienteService } from './../../services/paciente.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/core/interfaces/paciente';
import { FichaNutricionalService } from 'src/app/services/fucha-nutricional.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  personalFrm: FormGroup;
  submited = false;
  uidpaciente: any = '';
  constructor(
    public router: Router,
    private pacienteService: PacienteService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fichaService: FichaNutricionalService) {
    this.personalFrm = new FormGroup({
      genero: new FormControl(''),
      edad: new FormControl(''),
      estatura: new FormControl('', Validators.required),
      peso: new FormControl('', Validators.required),
      perimetro: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getPacienteUserById();
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() {
    return this.personalFrm.value;
  }


  getPacienteUserById(){
    this.pacienteService.getPacienteByUserId(localStorage.getItem('uid_user')).subscribe(
      (r: PacienteResponse) => {
        this.uidpaciente = r.paciente._id;
        localStorage.setItem('uid_paciente', this.uidpaciente);
        this.personalFrm.patchValue({
          genero: r.paciente.genero,
          edad: r.paciente.edad
        });
      },
      (error) => {
        this.personalFrm.patchValue({
          genero: '',
          edad: ''
        });
      }
    );
  }

  async ngSubmit()
  {
    this.submited = true;
    const loading = await this.loadingCtrl.create({message: 'Espere un momento por favor'});
    if ( this.personalFrm.invalid){
      return true;
    }
    await loading.present();
    const valueForm = this.personalFrm.value;
    const data ={
      objetivo:localStorage.getItem('nameobjetico'),
      nivel_actividad:localStorage.getItem('nameactiviy'),
      taza_actividad:localStorage.getItem('taza'),
      imc_inicial:'',
      imc_actual:'',
      peso_inicial:  valueForm.peso,
      peso_actual:'' ,
      perimetro_abdominal_inicial: valueForm.perimetro,
      perimetro_abdominal_actual: '',
      talla: valueForm.estatura,
      balanza_persona: '',
      balanza_alimentos: '',
      accesorios_ejercicio: '',
      descripcion_accesorio_ejercicio: '',
      paciente: this.uidpaciente
    };
    this.fichaService.registroFicha(data).subscribe(async (response: any) => {

      // eslint-disable-next-line no-underscore-dangle
      //localStorage.setItem('uid_ficha', response.fichas._id);
      this.router.navigate(['collect/imc']);
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
