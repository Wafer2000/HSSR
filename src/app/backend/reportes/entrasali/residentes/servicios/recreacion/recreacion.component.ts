import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { RegistroSResi, Usuarios } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-recreacion',
  templateUrl: './recreacion.component.html',
  styleUrls: ['./recreacion.component.scss'],
})
export class RecreacionComponent implements OnInit {

  diario: RegistroSResi[] = [];
  diariocasa: RegistroSResi[] = [];
  diarioindi: RegistroSResi[] = [];
  semanal: RegistroSResi[] = [];
  semanalcasa: RegistroSResi[] = [];
  semanalindi: RegistroSResi[] = [];
  quincenal: RegistroSResi[] = [];
  quincenalcasa: RegistroSResi[] = [];
  quincenalindi: RegistroSResi[] = [];
  mensual: RegistroSResi[] = [];
  mensualcasa: RegistroSResi[] = [];
  mensualindi: RegistroSResi[] = [];
  semestral: RegistroSResi[] = [];
  semestralcasa: RegistroSResi[] = [];
  semestralindi: RegistroSResi[] = [];
  anual: RegistroSResi[] = [];
  anualcasa: RegistroSResi[] = [];
  anualindi: RegistroSResi[] = [];
  
  usuarios: Usuarios[]=[];

  public selectedSegment: string='Diario';

  public selectedSegmentqui: string='1';
  public selectedSegmentsem: string='1';
  public selectedSegmentdia: string='1';
  public selectedSegmentwee: string='1';
  public selectedSegmentmen: string='1';
  public selectedSegmentanu: string='1';

  persona: string;
  casa: string;

  dateObj = new Date();
  dia = this.dateObj.getUTCDate();
  diasem = this.dateObj.getUTCDay();
  diasem2 = this.dia+this.diasem;
  
  constructor(
    public modalController: ModalController,
    public firestoreService: FirestoreService,
    public alertController: AlertController,
  ) { }

   ngOnInit() {
     this.Usuarios();
     this.Todos();
  }

  cerrar(){
    this.modalController.dismiss();
  }

  Usuarios(){
    this.firestoreService.getCollection<Usuarios>('Usuarios').subscribe( res => {
      console.log(res)
      this.usuarios = res;
    })
  }

  Todos(){
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const mes = dateObj.getUTCMonth() + 1;
    const año = dateObj.getUTCFullYear();
    const diasem = dateObj.getUTCDay();
    const diasemi = dia-diasem;
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicDescDouble<RegistroSResi>(path, 'dia', dia, 'services', 'Recreacion').subscribe( res => {
      this.diario = res;
    });
    this.firestoreService.getCollectionUnicMasDouble<RegistroSResi>(path, 'dia', diasemi, 'services', 'Recreacion').subscribe( res => {
      this.semanal = res;
    });
    if(dia>15){
      this.firestoreService.getCollectionUnicDescDouble<RegistroSResi>(path, 'qui', 2, 'services', 'Recreacion').subscribe( res => {
        this.quincenal = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescDouble<RegistroSResi>(path, 'qui', 1, 'services', 'Recreacion').subscribe( res => {
        this.quincenal = res;
      });
    }
    this.firestoreService.getCollectionUnicDescDouble<RegistroSResi>(path, 'mes', mes, 'services', 'Recreacion').subscribe( res => {
      this.mensual = res;
    });
    if(mes>6){
      this.firestoreService.getCollectionUnicDescDouble<RegistroSResi>(path, 'sem', 2, 'services', 'Recreacion').subscribe( res => {
        this.semestral = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescDouble<RegistroSResi>(path, 'sem', 1, 'services', 'Recreacion').subscribe( res => {
        this.semestral = res;
      });
    }
    this.firestoreService.getCollectionUnicDescDouble<RegistroSResi>(path, 'año', año, 'services', 'Recreacion').subscribe( res => {
      this.anual = res;
    });
  }

  segmentChanged(event: any){
    console.log(event.target.value);
    this.selectedSegment=event.target.value
  }

  Quincenal(event: any){
    console.log(event.target.value);
    this.selectedSegmentqui=event.target.value
  }

  Semestral(event: any){
     console.log(event.target.value);
     this.selectedSegmentsem=event.target.value
  }

  Diario(event: any){
    this.selectedSegmentdia=event.target.value
  }

  Semanal(event: any){
    this.selectedSegmentwee=event.target.value
  }

  Mensual(event: any){
    this.selectedSegmentmen=event.target.value
  }

  Anual(event: any){
    this.selectedSegmentanu=event.target.value
  }

  BuscarDiarioCasa(casa){
    console.log(casa);
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'dia', dia, 'numcasa', casa, 'services', 'Recreacion').subscribe( res => {
      this.diariocasa = res;
    });
  }

  BuscarDiarioIndi(persona){
    console.log(persona);
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'dia', dia, 'uid', persona, 'services', 'Recreacion').subscribe( res => {
      this.diarioindi = res;
    });
  }

  BuscarSemanalCasa(casa){
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const diasem = dateObj.getUTCDay();
    const diasem1 = dia-diasem;
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicMasTriple<RegistroSResi>(path, 'dia', diasem1, 'numcasa', casa, 'services', 'Recreacion').subscribe( res => {
      this.semanalcasa = res;
    });
  }

  BuscarSemanalIndi(persona){
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const diasem = dateObj.getUTCDay();
    const diasem1 = dia-diasem;
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicMasTriple<RegistroSResi>(path, 'dia', diasem1, 'uid', persona, 'services', 'Recreacion').subscribe( res => {
      this.semanalindi = res;
    });
  }

  BuscarQuincenalCasa(casa){
    const path = 'RegistroS';
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    if(dia>15){
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'qui', 2, 'numcasa', casa, 'services', 'Recreacion').subscribe( res => {
        this.quincenalcasa = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'qui', 1, 'numcasa', casa, 'services', 'Recreacion').subscribe( res => {
        this.quincenalcasa = res;
      });
    }
  }

  BuscarQuincenalIndi(persona){
    const path = 'RegistroS';
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    if(dia>15){
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'qui', 2, 'uid', persona, 'services', 'Recreacion').subscribe( res => {
        this.quincenalindi = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'qui', 1, 'uid', persona, 'services', 'Recreacion').subscribe( res => {
        this.quincenalindi = res;
      });
    }
  }

  BuscarMensualCasa(casa){
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'mes', mes, 'numcasa', casa, 'services', 'Recreacion').subscribe( res => {
      this.mensualcasa = res;
    });
  }

  BuscarMensualIndi(persona){
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'mes', mes, 'uid', persona, 'services', 'Recreacion').subscribe( res => {
      this.mensualindi = res;
    });
  }

  BuscarSemestralCasa(casa){
    const path = 'RegistroS';
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    if(mes>6){
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'sem', 2, 'numcasa', casa, 'services', 'Recreacion').subscribe( res => {
        this.semestralcasa = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'sem', 1, 'numcasa', casa, 'services', 'Recreacion').subscribe( res => {
        this.semestralcasa = res;
      });
    }
  }

  BuscarSemestralIndi(persona){
    const path = 'RegistroS';
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    if(mes>6){
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'sem', 2, 'uid', persona, 'services', 'Recreacion').subscribe( res => {
        this.semestralindi = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'sem', 1, 'uid', persona, 'services', 'Recreacion').subscribe( res => {
        this.semestralindi = res;
      });
    }
  }

  BuscarAnualCasa(casa){
    const dateObj = new Date();
    const año = dateObj.getUTCFullYear();
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'año', año, 'numcasa', casa, 'services', 'Recreacion').subscribe( res => {
      this.anualcasa = res;
    });
  }

  BuscarAnualIndi(persona){
    const dateObj = new Date();
    const año = dateObj.getUTCFullYear();
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'año', año, 'uid', persona, 'services', 'Recreacion').subscribe( res => {
      this.anualindi = res;
    });
  }

}
