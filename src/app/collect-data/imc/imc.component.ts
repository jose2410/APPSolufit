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
    private fichaService: FichaNutricionalService
    ) { }

  ngOnInit() {
    this.getFichaByPacienteId();
  }
  go(){
    this.updateFicha();
    this.router.navigate(['collect/health']);
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
    else if(this.imc > 18.5 || this.imc === 24.9){return 'Normal'}
    else if(this.imc > 25.0 || this.imc === 29.9){return 'Sobrepeso'}
    else if(this.imc > 30.0){return 'Obesidad'}
  }

  updateFicha(){
    const datas = {
      fecha_registro:this.data.fecha_registro,
      imc_inicial: this.imc,
      imc_actual:this.data.imc_actual,
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
      console.log(response);
     });
  }
}
