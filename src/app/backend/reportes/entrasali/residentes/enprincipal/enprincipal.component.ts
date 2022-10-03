import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Registro, Usuarios } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-enprincipal',
  templateUrl: './enprincipal.component.html',
  styleUrls: ['./enprincipal.component.scss'],
})
export class EnprincipalComponent implements OnInit {

  diario: Registro[] = [];
  diariocasa: Registro[] = [];
  diarioindi: Registro[] = [];
  semanal: Registro[] = [];
  semanalcasa: Registro[] = [];
  semanalindi: Registro[] = [];
  quincenal: Registro[] = [];
  quincenalcasa: Registro[] = [];
  quincenalindi: Registro[] = [];
  mensual: Registro[] = [];
  mensualcasa: Registro[] = [];
  mensualindi: Registro[] = [];
  semestral: Registro[] = [];
  semestralcasa: Registro[] = [];
  semestralindi: Registro[] = [];
  anual: Registro[] = [];
  anualcasa: Registro[] = [];
  anualindi: Registro[] = [];
  
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
    const path = 'RegistroPP';
    this.firestoreService.getCollectionUnicDescDouble<Registro>(path, 'dia', dia, 'tipo', 'Residente').subscribe( res => {
      this.diario = res;
    });
    this.firestoreService.getCollectionUnicMasDouble<Registro>(path, 'dia', diasemi, 'tipo', 'Residente').subscribe( res => {
      this.semanal = res;
    });
    if(dia>15){
      this.firestoreService.getCollectionUnicDescDouble<Registro>(path, 'qui', 2, 'tipo', 'Residente').subscribe( res => {
        this.quincenal = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescDouble<Registro>(path, 'qui', 1, 'tipo', 'Residente').subscribe( res => {
        this.quincenal = res;
      });
    }
    this.firestoreService.getCollectionUnicDescDouble<Registro>(path, 'mes', mes, 'tipo', 'Residente').subscribe( res => {
      this.mensual = res;
    });
    if(mes>6){
      this.firestoreService.getCollectionUnicDescDouble<Registro>(path, 'sem', 2, 'tipo', 'Residente').subscribe( res => {
        this.semestral = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescDouble<Registro>(path, 'sem', 1, 'tipo', 'Residente').subscribe( res => {
        this.semestral = res;
      });
    }
    this.firestoreService.getCollectionUnicDescDouble<Registro>(path, 'año', año, 'tipo', 'Residente').subscribe( res => {
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
    const path = 'RegistroPP';
    this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'dia', dia, 'numcasa', casa, 'tipo', 'Residente').subscribe( res => {
      this.diariocasa = res;
    });
  }

  BuscarDiarioIndi(persona){
    console.log(persona);
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const path = 'RegistroPP';
    this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'dia', dia, 'uid', persona, 'tipo', 'Residente').subscribe( res => {
      this.diarioindi = res;
    });
  }

  BuscarSemanalCasa(casa){
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const diasem = dateObj.getUTCDay();
    const diasem1 = dia-diasem;
    const path = 'RegistroPP';
    this.firestoreService.getCollectionUnicMasTriple<Registro>(path, 'dia', diasem1, 'numcasa', casa, 'tipo', 'Residente').subscribe( res => {
      this.semanalcasa = res;
    });
  }

  BuscarSemanalIndi(persona){
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const diasem = dateObj.getUTCDay();
    const diasem1 = dia-diasem;
    const path = 'RegistroPP';
    this.firestoreService.getCollectionUnicMasTriple<Registro>(path, 'dia', diasem1, 'uid', persona, 'tipo', 'Residente').subscribe( res => {
      this.semanalindi = res;
    });
  }

  BuscarQuincenalCasa(casa){
    const path = 'RegistroPP';
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    if(dia>15){
      this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'qui', 2, 'numcasa', casa, 'tipo', 'Residente').subscribe( res => {
        this.quincenalcasa = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'qui', 1, 'numcasa', casa, 'tipo', 'Residente').subscribe( res => {
        this.quincenalcasa = res;
      });
    }
  }

  BuscarQuincenalIndi(persona){
    const path = 'RegistroPP';
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    if(dia>15){
      this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'qui', 2, 'uid', persona, 'tipo', 'Residente').subscribe( res => {
        this.quincenalindi = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'qui', 1, 'uid', persona, 'tipo', 'Residente').subscribe( res => {
        this.quincenalindi = res;
      });
    }
  }

  BuscarMensualCasa(casa){
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    const path = 'RegistroPP';
    this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'mes', mes, 'numcasa', casa, 'tipo', 'Residente').subscribe( res => {
      this.mensualcasa = res;
    });
  }

  BuscarMensualIndi(persona){
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    const path = 'RegistroPP';
    this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'mes', mes, 'uid', persona, 'tipo', 'Residente').subscribe( res => {
      this.mensualindi = res;
    });
  }

  BuscarSemestralCasa(casa){
    const path = 'RegistroPP';
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    if(mes>6){
      this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'sem', 2, 'numcasa', casa, 'tipo', 'Residente').subscribe( res => {
        this.semestralcasa = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'sem', 1, 'numcasa', casa, 'tipo', 'Residente').subscribe( res => {
        this.semestralcasa = res;
      });
    }
  }

  BuscarSemestralIndi(persona){
    const path = 'RegistroPP';
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    if(mes>6){
      this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'sem', 2, 'uid', persona, 'tipo', 'Residente').subscribe( res => {
        this.semestralindi = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'sem', 1, 'uid', persona, 'tipo', 'Residente').subscribe( res => {
        this.semestralindi = res;
      });
    }
  }

  BuscarAnualCasa(casa){
    const dateObj = new Date();
    const año = dateObj.getUTCFullYear();
    const path = 'RegistroPP';
    this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'año', año, 'numcasa', casa, 'tipo', 'Residente').subscribe( res => {
      this.anualcasa = res;
    });
  }

  BuscarAnualIndi(persona){
    const dateObj = new Date();
    const año = dateObj.getUTCFullYear();
    const path = 'RegistroPP';
    this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'año', año, 'uid', persona, 'tipo', 'Residente').subscribe( res => {
      this.anualindi = res;
    });
  }

}
