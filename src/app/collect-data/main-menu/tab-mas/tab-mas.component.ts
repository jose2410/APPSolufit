import { LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-mas',
  templateUrl: './tab-mas.component.html',
  styleUrls: ['./tab-mas.component.scss'],
})
export class TabMasComponent implements OnInit {
  frmPersona: FormGroup;
  paciente: any;
  constructor(private apiservice: AuthService,
    private loadingCtrl: LoadingController,
     private toastCtrl: ToastController,) {
    this.frmPersona = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      sexo: new FormControl(''),
      edad: new FormControl(''),
    });
   }

  ngOnInit() {
    this.getPaciente();
  }

  getPaciente(){
    this.apiservice.getPaciente(localStorage.getItem('uid_user')).subscribe((r: any)=>{
      console.log(r);
      this.paciente = r.paciente;
      this.frmPersona.patchValue({
        nombre: r.paciente.nombre,
        apellido: r.paciente.apellidos,
        sexo: r.paciente.genero,
        edad: r.paciente.edad
      });
    });
  }

async  update(){
    const loading = await this.loadingCtrl.create({message: 'Cargando ... un momento por favor'});
    await loading.present();
    const formValue = this.frmPersona.value;
    const data ={
      // eslint-disable-next-line no-underscore-dangle
      _id:this.paciente._id,
      nombre:formValue.nombre,
      apellidos:formValue.apellido,
      genero:formValue.sexo,
      edad:formValue.edad,
      celular:this.paciente.celular,
      dociden:this.paciente.dociden,
      estado:this.paciente.estado,
      estado_plan:this.paciente.estado_plan,
      usuario:this.paciente.usuario,
      fecha_creacion:this.paciente.fecha_creacion,
    };
    this.apiservice.actulizarPaciente(data).subscribe( async(r: any)=>{
      await loading.dismiss();
      console.log(r);
      this.frmPersona.patchValue({
        nombre: r.paciente.nombre,
        apellido: r.paciente.apellidos,
        sexo: r.paciente.genero,
        edad: r.paciente.edad
      });
    }, async (error) => {
      console.log(error);
      const er = error.error;
      const toastError = await this.toastCtrl.create({message: `El registro fallo`, duration: 2500});
      await toastError.present();
      await loading.dismiss();
    }, () => {
      loading.dismiss();
    });
  }

}
