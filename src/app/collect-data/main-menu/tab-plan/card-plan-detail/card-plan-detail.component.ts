import { LoadingController, ToastController } from '@ionic/angular';
import { FichaNutricionalService } from 'src/app/services/fucha-nutricional.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-plan-detail',
  templateUrl: './card-plan-detail.component.html',
  styleUrls: ['./card-plan-detail.component.scss'],
})
export class CardPlanDetailComponent implements OnInit {
  comidas: any = [];
  list: any[] = [];
  constructor(
    public router: Router,
    private apiPLan: FichaNutricionalService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,) { }

  ngOnInit() {
    this.getDetailComida();
  }
  goToplan(){
this.router.navigate(['main/plan']);
  }

  getDetailComida(){
    this.apiPLan.getComidadetail(localStorage.getItem('comidaId')).subscribe((response: any)=>{
      this.comidas = response.comida;
      this.list = JSON.parse(response.comida.lista_alimentos);
        console.log(JSON.parse(response.comida.lista_alimentos));
    });
  }

  async actilizarComida(){
    const loading = await this.loadingCtrl.create({message: 'Espere un momento por favor'});
    const data ={
      // eslint-disable-next-line @typescript-eslint/naming-convention
      nom_comida:this.comidas.nom_comida,
      descripcion:this.comidas.descripcion,
      energia: this.comidas.energia,
      grasa: this.comidas.grasa,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      h_carbono: this.comidas.h_carbono,
      proteina:this.comidas.proteina,
      fibra: this.comidas.fibra,
      tipo:this.comidas.tipo,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      estado_comida: true,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      lista_alimentos: this.comidas.lista_alimentos,
      horario: this.comidas.horario,
      // eslint-disable-next-line no-underscore-dangle
      _id:this.comidas._id
    };
    await loading.present();
    this.apiPLan.actualizarComidaEstado(data).subscribe((response: any)=>{
      console.log(response);
      if(response.ok){
        this.router.navigate(['main/plan']);
      }
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
