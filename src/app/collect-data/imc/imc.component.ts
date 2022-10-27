import { LoadingController, ToastController } from '@ionic/angular';
import { FichaNutricionalService } from 'src/app/services/fucha-nutricional.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imc',
  templateUrl: './imc.component.html',
  styleUrls: ['./imc.component.scss'],
})
export class ImcComponent implements OnInit {
  imc: any;
  title: any;
  data: any;
  constructor(
    public router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fichaService: FichaNutricionalService
    ) { }

  ngOnInit() {
    this.getFichaByPacienteId();
  }
  go(){
    this.updateFicha();
  }


  getFichaByPacienteId(){
    this.fichaService.getFichaByPacienteId(localStorage.getItem('uid_paciente')).subscribe((response: any)=>{
     const fichaN = response.ficha;
     this.data = response.ficha;
      this.imc = this.carlularIMC(fichaN);
      this.title = this.showTexto();
    });
  }

  carlularIMC(dato){
    return Number(dato.peso_inicial) / (Number(dato.talla)* Number(dato.talla));
  }

  showTexto(){
    if(this.imc < 18.5){return 'Bajo de peso'}
    else if(this.imc > 18.5 && this.imc < 24.9){return 'Peso Saludable'}
    else if(this.imc > 25.0 && this.imc < 29.9){return 'Sobrepeso'}
    else if(this.imc > 30.0){return 'Obesidad'}
  }

 async updateFicha(){
    const loading = await this.loadingCtrl.create({message: 'Espere un momento por favor'});
    await loading.present();
    const datas = {
      fecha_registro:this.data.fecha_registro,
      imc_inicial: this.imc,
      imc_actual:this.data.imc_actual,
      imc_descripcion:this.title,
      peso_inicial:  this.data.peso_inicial,
      peso_actual:this.data.peso_actual ,
      perimetro_abdominal_inicial:this.data.perimetro_abdominal_inicial,
      perimetro_abdominal_actual: this.data.perimetro_abdominal_actual,
      talla: this.data.talla,
      balanza_persona: this.data.balanza_persona,
      balanza_alimentos: this.data.balanza_alimentos,
      accesorios_ejercicio: this.data.accesorios_ejercicio,
      descripcion_accesorio_ejercicio: this.data.descripcion_accesorio_ejercicio,
      paciente: this.data.paciente,
      // eslint-disable-next-line no-underscore-dangle
      _id: this.data._id
    };

    this.fichaService.actualizarFicha(datas).subscribe((response: any)=>{
      // eslint-disable-next-line no-underscore-dangle
      localStorage.setItem('uid_ficha', response.fichas._id);
      this.router.navigate(['collect/health']);
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
}
