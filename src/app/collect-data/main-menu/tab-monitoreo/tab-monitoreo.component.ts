import { DatePipe } from '@angular/common';
import { AuthService } from './../../../services/auth.service';
import { FichaNutricionalService } from 'src/app/services/fucha-nutricional.service';
import { IonInfiniteScroll, LoadingController, ToastController } from '@ionic/angular';

import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { Comida } from 'src/app/core/interfaces/comida';
@Component({
  selector: 'app-tab-monitoreo',
  templateUrl: './tab-monitoreo.component.html',
  styleUrls: ['./tab-monitoreo.component.scss'],
  providers: [DatePipe]
})
export class TabMonitoreoComponent implements AfterViewInit  {
  @ViewChild('lineCanvas') lineCanvas: ElementRef | undefined;
  @ViewChild('lineCanvas2') lineCanvas2: ElementRef | undefined;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  lineChart: any;
  lineChart2: any;


  enableInfinteScroll = true;
  page = 1;
  mes: any[] = [];
  peso: any[] = [];
  abdomen: any[] = [];
  ficha: any[] = [];
  datoPorcentaje= 0;
  dato: Comida[] = [];

  idfechahorario: any;
  horario: any;

  constructor(private apiServiceFicha: FichaNutricionalService, private apiService: AuthService,private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,private datePipe: DatePipe) { }

  ngAfterViewInit(): void {
    this.getSeguimiento();
    console.log(new Date());
  }

 async getSeguimiento(){
    const loading = await this.loadingCtrl.create({message: 'Cargando ... un momento por favor'});
    await loading.present();
    this.apiService.getPaciente(localStorage.getItem('uid_user')).subscribe((response: any)=>{
      if(response.ok){
        // eslint-disable-next-line no-underscore-dangle
        this.apiService.getPlan(response.paciente._id).subscribe( async (resp: any)=>{
          await loading.dismiss();
          if(resp.ok){
             // eslint-disable-next-line no-underscore-dangle
            this.idfechahorario = resp.plan._id;
            this.apiService.getHorario(this.idfechahorario).subscribe((resps: any)=>{
              console.log(resps);
              this.horario = resps.horario.fecha_registro;
                // eslint-disable-next-line no-underscore-dangle
                this.apiServiceFicha.getSeguimientoByHorarioId(resps.horario._id).subscribe((sgresponse: any)=>{
                  console.log(sgresponse);
                  sgresponse.list.forEach(e => {
                    this.mes.push(this.datePipe.transform(e.fecha_registro, 'MMM'));
                    this.peso.push(e.peso);
                    this.abdomen.push(e.medidas_cintura);
                  });
                  this.lineChartMethod();
                });
            }, async (error) => {
              console.log(error);
              const er = error.error;
              const toastError = await this.toastCtrl.create({message: `No se obtuvo el horario`, duration: 2500});
              await toastError.present();
              await loading.dismiss();
            }, () => {
              loading.dismiss();
            });

            // eslint-disable-next-line no-underscore-dangle
            this.apiServiceFicha.getHorarioFechaRegistroById(this.idfechahorario,this.formatDate(new Date())).subscribe((rfech: any)=>{
              console.log(rfech, 'demooo');
              // eslint-disable-next-line no-underscore-dangle
              this.apiServiceFicha.getComidaByHorarioId(rfech.list._id).subscribe((com: any)=>{
                this.dato = com.list;
                this.dato.forEach(e => {
                  if(e.estado_comida){
                    this.datoPorcentaje =  ( this.datoPorcentaje + Number(e.porcentaje));
                  }
                });
                console.log(this.datoPorcentaje);
              });
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
        // eslint-disable-next-line no-underscore-dangle
        this.apiServiceFicha.getFichaByPacienteId(response.paciente._id).subscribe((resfi: any)=>{
          this.ficha =resfi.ficha;
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

  loadData($event: any) {
    setTimeout(() => {
      this.page = this.page + 1;
      /*this.planesAsync.push(
        ...this.planes.slice(50 * this.page, 50 * this.page + 50)
      );*/

      $event.target.complete();
    }, 750);
  }
  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: this.mes,
        datasets: [
          {
            // label: 'Sell per week',
          //  lineTension: 0.2,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.peso,
            spanGaps: false,
          },
        ],
      },
    });
    this.lineChart2 = new Chart(this.lineCanvas2?.nativeElement, {
      type: 'line',
      data: {
        labels: this.mes,
        datasets: [
          {
           // label: 'Sell per week',
          //  lineTension: 0.2,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.abdomen,
            spanGaps: false,
          },
        ],
      },
    });

  }

  formatDate(fecha: any){
  return  this.datePipe.transform(fecha, 'yyyy-MM-dd');
 }
}
