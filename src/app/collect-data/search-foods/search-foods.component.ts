import { LoadingController, ToastController } from '@ionic/angular';
import { FichaNutricionalService } from 'src/app/services/fucha-nutricional.service';
import { Food } from './../../core/interfaces/food';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-search-foods',
  templateUrl: './search-foods.component.html',
  styleUrls: ['./search-foods.component.scss'],
})
export class SearchFoodsComponent implements OnInit {
  submited = false;
  proteina = [
    {
      id: 1,
      namefood: 'atun',
      imgsvg: '../../../assets/alimentos/atun.jpg',
      flag: 'proteina',
      isChecked: false
    },
    {
      id: 2,
      namefood: 'carne',
      imgsvg: '../../../assets/alimentos/carne.jpg',
      flag: 'proteina',
      isChecked: false
    },
    {
      id: 3,
      namefood: 'cerdo',
      imgsvg: '../../../assets/alimentos/cerdo.jpg',
      flag: 'proteina',
      isChecked: false
    },
    {
      id: 4,
      namefood: 'huevo',
      imgsvg: '../../../assets/alimentos/huevo.jpg',
      flag: 'proteina',
      isChecked: false
    },
    {
      id: 5,
      namefood: 'jamón',
      imgsvg: '../../../assets/alimentos/jamon.jpg',
      flag: 'proteina',
      isChecked: false
    },
    {
      id: 6,
      namefood: 'pavo',
      imgsvg: '../../../assets/alimentos/pavo.jpg',
      flag: 'proteina',
      isChecked: false
    }
    ,
    {
      id: 7,
      namefood: 'pescado',
      imgsvg: '../../../assets/alimentos/pescado.jpg',
      flag: 'proteina',
      isChecked: false
    }
    ,
    {
      id: 8,
      namefood: 'pollo',
      imgsvg: '../../../assets/alimentos/pollo.jpg',
      flag: 'proteina',
      isChecked: false
    }
    ,
  ];

   carbohidratos = [
       {
         id: 9,
         namefood: 'arroz',
         imgsvg: '../../../assets/alimentos/arroz.jpg',
         flag: 'carbohidratos',
         isChecked: false
       },
       {
         id: 10,
         namefood: 'arvejas',
         imgsvg: '../../../assets/alimentos/arvejas.jpg',
         flag: 'carbohidratos',
         isChecked: false
       },
       {
         id: 11,
         namefood: 'camote',
         imgsvg: '../../../assets/alimentos/camote.jpg',
         flag: 'carbohidratos',
         isChecked: false
       },
       {
         id: 12,
         namefood: 'frejoles',
         imgsvg: '../../../assets/alimentos/frejoles.jpg',
         flag: 'carbohidratos',
         isChecked: false
       },
       {
         id: 13,
         namefood: 'garbanzos',
         imgsvg: '../../../assets/alimentos/garbanzos.jpg',
         flag: 'carbohidratos',
         isChecked: false
       },
       {
         id: 14,
         namefood: 'lentejas',
         imgsvg: '../../../assets/alimentos/lentejas.jpg',
         flag: 'carbohidratos',
         isChecked: false
       }
       ,
       {
         id: 15,
         namefood: 'papa',
         imgsvg: '../../../assets/alimentos/papa.jpg',
         flag: 'carbohidratos',
         isChecked: false
       }
       ,
       {
         id: 16,
         namefood: 'quinua',
         imgsvg: '../../../assets/alimentos/quinua.jpg',
         flag: 'carbohidratos',
         isChecked: false
       }
       ,
       {
         id:17,
         namefood:'yuca',
         imgsvg: '../../../assets/alimentos/yuca.jpg',
         flag: 'carbohidratos',
         isChecked: false
       }
     ];

     grasas = [
      {
        id: 1,
        namefood: 'aceitunas',
        imgsvg: '../../../assets/alimentos/aceitunas.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 2,
        namefood: 'almendras',
        imgsvg: '../../../assets/alimentos/almendras.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 3,
        namefood: 'chia',
        imgsvg: '../../../assets/alimentos/chia.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 4,
        namefood: 'chocolate',
        imgsvg: '../../../assets/alimentos/chocolate.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 5,
        namefood: 'granola',
        imgsvg: '../../../assets/alimentos/granola.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 6,
        namefood: 'mani',
        imgsvg: '../../../assets/alimentos/mani.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
      ,
      {
        id: 7,
        namefood: 'nueces',
        imgsvg: '../../../assets/alimentos/nueces.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
      ,
      {
        id: 8,
        namefood: 'palta',
        imgsvg: '../../../assets/alimentos/palta.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
      ,
      {
        id:9,
        namefood:'pecanas',
        imgsvg: '../../../assets/alimentos/pecanas.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
    ];

    lacteosb = [
      {
        id: 1,
        namefood: 'leche',
        imgsvg: '../../../assets/alimentos/leche.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 2,
        namefood: 'leche almendras',
        imgsvg: '../../../assets/alimentos/lechealm.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 3,
        namefood: 'leche de coco',
        imgsvg: '../../../assets/alimentos/lechecoco.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 4,
        namefood: 'leche de soya',
        imgsvg: '../../../assets/alimentos/lechesoya.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 5,
        namefood: 'queso',
        imgsvg: '../../../assets/alimentos/queso.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 6,
        namefood: 'yogurt',
        imgsvg: '../../../assets/alimentos/yogurt.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
    ];

    frutas = [
      {
        id: 1,
        namefood: 'arandanos',
        imgsvg: '../../../assets/alimentos/arandanos.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 2,
        namefood: 'durazno',
        imgsvg: '../../../assets/alimentos/durazno.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 3,
        namefood: 'fresas',
        imgsvg: '../../../assets/alimentos/fresas.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 4,
        namefood: 'granadilla',
        imgsvg: '../../../assets/alimentos/granadilla.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 5,
        namefood: 'kiwi',
        imgsvg: '../../../assets/alimentos/kiwi.jpg',
        flag: 'carbohidratos',
        isChecked: false
      },
      {
        id: 6,
        namefood: 'mandarina',
        imgsvg: '../../../assets/alimentos/mandarina.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
      ,
      {
        id: 7,
        namefood: 'mango',
        imgsvg: '../../../assets/alimentos/mango.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
      ,
      {
        id: 8,
        namefood: 'manzana',
        imgsvg: '../../../assets/alimentos/manzana.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
      ,
      {
        id:9,
        namefood:'naranja',
        imgsvg: '../../../assets/alimentos/naranja.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
      ,
      {
        id:10,
        namefood:'pera',
        imgsvg: '../../../assets/alimentos/pera.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
      ,
      {
        id:11,
        namefood:'piña',
        imgsvg: '../../../assets/alimentos/pina.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
      ,
      {
        id:12,
        namefood:'plátano',
        imgsvg: '../../../assets/alimentos/platano.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
      ,
      {
        id:13,
        namefood:'sandía',
        imgsvg: '../../../assets/alimentos/sandia.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
      ,
      {
        id:14,
        namefood:'uvas',
        imgsvg: '../../../assets/alimentos/uvas.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
      ,
      {
        id:15,
        namefood:'papaya',
        imgsvg: '../../../assets/alimentos/papaya.jpg',
        flag: 'carbohidratos',
        isChecked: false
      }
    ];

  proteinas: Food[];
  carbohidratoss: Food[];
  grasass: Food[];
  lacteos: Food[];
  fruta: Food[];
  selectedItemsList: Food[];
  proteinasIDs = [];
  carbohidratossIDs = [];
  grasassIDs = [];
  lacteosIDs = [];
  frutaIDs = [];
  indicadores: any =[];
  constructor(
    public router: Router,
    private indicadorService: FichaNutricionalService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,) {
    this.proteinas = this.proteina;
    this.carbohidratoss = this.carbohidratos;
    this.grasass = this.grasas;
    this.lacteos = this.lacteosb;
    this.fruta = this.frutas;
   }

  ngOnInit() {
    this.fetchSelectedItems();
    this.fetchCheckedIDs();
    this.getFichaByPacienteId();
  }

  go(){
    this.router.navigate(['collect/quest']);
  }


  setEspecialidad($event: any) {

  }

  changeSelection() {
    this.fetchCheckedIDs();
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.proteina.filter((value, index) => value.isChecked);
    console.log('selectedItemsList',this.selectedItemsList);
  }

  fetchCheckedIDs() {
    this.proteinasIDs =  [];
    this.carbohidratossIDs =[];
    this.grasassIDs =[];
    this.lacteosIDs =[];
    this.frutaIDs =[];
    this.proteina.forEach((value, index) => {
      if (value.isChecked) {
        this.proteinasIDs.push(value.namefood);
      }
    });
    this.carbohidratos.forEach((value, index) => {
      if (value.isChecked) {
        this.carbohidratossIDs.push(value.namefood);
      }
    });
    this.grasas.forEach((value, index) => {
      if (value.isChecked) {
        this.grasassIDs.push(value.namefood);
      }
    });
    this.lacteosb.forEach((value, index) => {
      if (value.isChecked) {
        this.lacteosIDs.push(value.namefood);
      }
    });
    this.frutas.forEach((value, index) => {
      if (value.isChecked) {
        this.frutaIDs.push(value.namefood);
      }
    });
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
    const datas = {
      alergia: this.indicadores.alergia,
      alimentos_alergia:this.indicadores.alimentos_alergia,
      carbohidratos:this.carbohidratossIDs.toString(),
      comidas_desagrada:this.indicadores.comidas_desagrada,
      comindas_preferencia:this.indicadores.comindas_preferencia,
      descripcion_suplemento:this.indicadores.descripcion_suplemento,
      ficha_nutricional:this.indicadores.ficha_nutricional,
      frutos:this.frutaIDs.toString(),
      grasas:this.grasassIDs.toString(),
      lacteos:this.lacteosIDs.toString(),
      proteina:this.proteinasIDs.toString(),
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
}
