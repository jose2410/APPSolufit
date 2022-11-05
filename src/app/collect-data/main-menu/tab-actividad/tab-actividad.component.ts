import { AuthService } from './../../../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FichaNutricionalService } from 'src/app/services/fucha-nutricional.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab-actividad',
  templateUrl: './tab-actividad.component.html',
  styleUrls: ['./tab-actividad.component.scss'],
  providers: [DatePipe]
})
export class TabActividadComponent implements OnInit {
  registerAct: FormGroup;
  submited = false;
  isDesable= false;
  idhorario: any;
  fechaActual: any;
  imc: any;
  title: any;
  dataFicha: any;
  idpaciente: any;
  constructor(private apiSeguimiento: FichaNutricionalService, private fb: FormBuilder,private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private apiService: AuthService,private datePipe: DatePipe) {
    this.registerAct = this.fb.group(
      {
        peso: ['',Validators.required],
        perimetro: ['',Validators.required],
      }
    );
   }

  ngOnInit() {
    this.fechaActual = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    console.log(this.fechaActual);
    this.getPaciente();
  }

 async getPaciente(){
    const loading = await this.loadingCtrl.create({message: 'Cargando ... un momento por favor'});
    await loading.present();
    this.apiService.getPaciente(localStorage.getItem('uid_user')).subscribe((response: any)=>{
      if(response.ok){
        // eslint-disable-next-line no-underscore-dangle
        this.apiService.getPlan(response.paciente._id).subscribe( async (resp: any)=>{
          await loading.dismiss();
          if(resp.ok){
            // eslint-disable-next-line no-underscore-dangle
            this.idpaciente = response.paciente._id;
            // eslint-disable-next-line no-underscore-dangle
            this.apiService.getHorario(resp.plan._id).subscribe((resps: any)=>{
                // eslint-disable-next-line no-underscore-dangle
                this.idhorario = resps.horario._id;
                this.getSeguimiento(this.idhorario);
                this.getFichaByPacienteId(this.idpaciente);
            }, async (error) => {
              console.log(error);
              const er = error.error;
              const toastError = await this.toastCtrl.create({message: `No se obtuvo el horario`, duration: 2500});
              await toastError.present();
              await loading.dismiss();
            }, () => {
              loading.dismiss();
            });
          }
        }, async (error) => {
          console.log(error);
          const er = error.error;
          const toastError = await this.toastCtrl.create({message: `No se obtuvo el plan`, duration: 2500});
          await toastError.present();
          await loading.dismiss();
        }, () => {
          loading.dismiss();
        });
      }
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


 async crearSeguimiento(){
    const loading = await this.loadingCtrl.create({message: 'Cargando ... un momento por favor'});
    if (this.registerAct.invalid){
      return true;
    }
    await loading.present();
    const valueForm = this.registerAct.value;
    const data ={
      peso:valueForm.peso,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      medidas_cintura:valueForm.perimetro,
      horario:this.idhorario,
    };
    this.apiSeguimiento.registrarActivida(data).subscribe((response: any)=>{
      console.log(response);
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

 async getSeguimiento(id){
   const loading = await this.loadingCtrl.create({message: 'Cargando ... un momento por favor'});
   await loading.present();
    this.apiSeguimiento.getSeguimientoByHorarioId(id).subscribe(async (response: any)=>{
      console.log(response);
      if(response.ok){
        response.list.forEach(element => {
          if(this.datePipe.transform(element.fecha_registro, 'dd/MM/yyyy') === this.fechaActual){
            this.isDesable=true;
            this.registerAct.patchValue({
              peso: element.peso,
              perimetro: element.medidas_cintura,
            });
           this.imc= this.carlularIMC(element.peso,this.dataFicha);
           this.title= this.showTexto();
           this.updateFicha(this.imc,this.title,element.peso,element.medidas_cintura);
          }
        });
        await loading.dismiss();
      }
    }, async (error) => {
      console.log(error);
      const er = error.error;
      const toastError = await this.toastCtrl.create({message: `No se le logro obtener la informacion`, duration: 2500});
      await toastError.present();
      await loading.dismiss();
    }, () => {
      loading.dismiss();
    });
  }

  getFichaByPacienteId(id){
    this.apiSeguimiento.getFichaByPacienteId(id).subscribe((response: any)=>{
     const fichaN = response.ficha;
     this.dataFicha = response.ficha;
    });
  }

  async updateFicha(imc,title,peso,medidascintura){
    const loading = await this.loadingCtrl.create({message: 'Espere un momento por favor'});
    await loading.present();
    const datas = {
      fecha_registro:this.dataFicha.fecha_registro,
      fecha_actulizacion:new Date(),
      objetivo:this.dataFicha.objetivo,
      nivel_actividad:this.dataFicha.nivel_actividad,
      taza_actividad:this.dataFicha.taza_actividad,
      imc_inicial: this.dataFicha.imc_inicial,
      imc_actual:imc,
      imc_descripcion:title,
      peso_inicial:  this.dataFicha.peso_inicial,
      peso_actual: peso,
      perimetro_abdominal_inicial:this.dataFicha.perimetro_abdominal_inicial,
      perimetro_abdominal_actual:medidascintura ,
      talla: this.dataFicha.talla,
      balanza_persona: this.dataFicha.balanza_persona,
      balanza_alimentos: this.dataFicha.balanza_alimentos,
      accesorios_ejercicio: this.dataFicha.accesorios_ejercicio,
      descripcion_accesorio_ejercicio: this.dataFicha.descripcion_accesorio_ejercicio,
      paciente: this.dataFicha.paciente,
      // eslint-disable-next-line no-underscore-dangle
      _id: this.dataFicha._id
    };

    this.apiSeguimiento.actualizarFicha(datas).subscribe((response: any)=>{
      // eslint-disable-next-line no-underscore-dangle
      //localStorage.setItem('uid_ficha', response.fichas._id);

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

  carlularIMC(peso,dato){
    return Number(peso) / (Number(dato.talla)* Number(dato.talla));
  }
  showTexto(){
    if(this.imc < 18.5){return 'Bajo de peso'}
    else if(this.imc > 18.5 && this.imc < 24.9){return 'Peso Saludable'}
    else if(this.imc > 25.0 && this.imc < 29.9){return 'Sobrepeso'}
    else if(this.imc > 30.0){return 'Obesidad'}
  }
}
