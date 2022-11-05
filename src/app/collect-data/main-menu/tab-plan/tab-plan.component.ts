import { PacienteService } from './../../../services/paciente.service';
import { FichaNutricionalService } from 'src/app/services/fucha-nutricional.service';
import { Horario } from './../../../core/interfaces/horario';
import { Plan } from './../../../core/interfaces/plan';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab-plan',
  templateUrl: './tab-plan.component.html',
  styleUrls: ['./tab-plan.component.scss'],
})
export class TabPlanComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  comidas: any[];
  planes: any[];
  page = 1;
  enableInfinteScroll = true;
  userId: any;

  constructor(private apiPlan: FichaNutricionalService, private apiPaciente: PacienteService) {
   }

  ngOnInit() {
    this.getPacienteUser();
  }


async getPacienteUser(){
  //const loading = await this.loadingCtrl.create({message: 'Cargando ... un momento por favor'});
 // await loading.present();
  this.apiPaciente.getPacienteByUserId(localStorage.getItem('uid_user')).subscribe((response: any)=>{
    // eslint-disable-next-line no-underscore-dangle
    this.userId = response.paciente._id;
    if(response.ok){
      this.apiPlan.getPlanByPacienteId(this.userId).subscribe((r: any)=>{
       if(r.ok){
        // eslint-disable-next-line no-underscore-dangle
        this.apiPlan.getHorarioByPlanId(r.plan._id).subscribe((resp: any)=>{
          if(resp.ok){
            // eslint-disable-next-line no-underscore-dangle
            this.apiPlan.getComidaByHorarioId(resp.horario._id).subscribe((respc: any)=>{
              this.comidas =respc.list;
              console.log(respc.list);
            });
          }
        });
       }
      });
    }
  });
 }




}
