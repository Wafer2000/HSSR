import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Registro, Invitados } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-parqueadero',
  templateUrl: './parqueadero.component.html',
  styleUrls: ['./parqueadero.component.scss'],
})
export class ParqueaderoComponent implements OnInit {

  diario: Registro[] = [];
  diariotipo: Registro[] = [];
  semanal: Registro[] = [];
  semanaltipo: Registro[] = [];
  quincenal: Registro[] = [];
  quincenaltipo: Registro[] = [];
  mensual: Registro[] = [];
  mensualtipo: Registro[] = [];
  semestral: Registro[] = [];
  semestraltipo: Registro[] = [];
  anual: Registro[] = [];
  anualtipo: Registro[] = [];
  
  usuarios: Invitados[]=[];

  public selectedSegment: string='Diario';

  public selectedSegmentqui: string='1';
  public selectedSegmentsem: string='1';
  public selectedSegmentdia: string='1';
  public selectedSegmentwee: string='1';
  public selectedSegmentmen: string='1';
  public selectedSegmentanu: string='1';

  persona: string;
  tipo: string;

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
     this.Invitados();
     this.Todos();
  }

  cerrar(){
    this.modalController.dismiss();
  }

  Invitados(){
    this.firestoreService.getCollection<Invitados>('Invitados').subscribe( res => {
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
    const path = 'RegistroPA';
    this.firestoreService.getCollectionUnicDescDouble<Registro>(path, 'dia', dia, 'tipo', 'Invitado').subscribe( res => {
      this.diario = res;
    });
    this.firestoreService.getCollectionUnicMasDouble<Registro>(path, 'mes', diasemi, 'tipo', 'Invitado').subscribe( res => {
      this.semanal = res;
    });
    if(dia>15){
      this.firestoreService.getCollectionUnicDescDouble<Registro>(path, 'qui', 2, 'tipo', 'Invitado').subscribe( res => {
        this.quincenal = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescDouble<Registro>(path, 'qui', 1, 'tipo', 'Invitado').subscribe( res => {
        this.quincenal = res;
      });
    }
    this.firestoreService.getCollectionUnicDescDouble<Registro>(path, 'mes', mes, 'tipo', 'Invitado').subscribe( res => {
      this.mensual = res;
    });
    if(mes>6){
      this.firestoreService.getCollectionUnicDescDouble<Registro>(path, 'sem', 2, 'tipo', 'Invitado').subscribe( res => {
        this.semestral = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescDouble<Registro>(path, 'sem', 1, 'tipo', 'Invitado').subscribe( res => {
        this.semestral = res;
      });
    }
    this.firestoreService.getCollectionUnicDescDouble<Registro>(path, 'año', año, 'tipo', 'Invitado').subscribe( res => {
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

  BuscarDiarioTipo(tipo){
    console.log(tipo);
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const path = 'RegistroPA';
    this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'dia', dia, 'tinvitado', tipo, 'tipo', 'Invitado').subscribe( res => {
      this.diariotipo = res;
    });
  }

  BuscarSemanalTipo(tipo){
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const diasem = dateObj.getUTCDay();
    const diasem1 = dia-diasem;
    const path = 'RegistroPA';
    this.firestoreService.getCollectionUnicMasTriple<Registro>(path, 'mes', diasem1, 'tinvitado', tipo, 'tipo', 'Invitado').subscribe( res => {
      this.semanaltipo = res;
    });
  }

  BuscarQuincenalTipo(tipo){
    const path = 'RegistroPA';
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    if(dia>15){
      this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'qui', 2, 'tinvitado', tipo, 'tipo', 'Invitado').subscribe( res => {
        this.quincenaltipo = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'qui', 1, 'tinvitado', tipo, 'tipo', 'Invitado').subscribe( res => {
        this.quincenaltipo = res;
      });
    }
  }

  BuscarMensualTipo(tipo){
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    const path = 'RegistroPA';
    this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'mes', mes, 'tinvitado', tipo, 'tipo', 'Invitado').subscribe( res => {
      this.mensualtipo = res;
    });
  }

  BuscarSemestralTipo(tipo){
    const path = 'RegistroPA';
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    if(mes>6){
      this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'sem', 2, 'tinvitado', tipo, 'tipo', 'Invitado').subscribe( res => {
        this.semestraltipo = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'sem', 1, 'tinvitado', tipo, 'tipo', 'Invitado').subscribe( res => {
        this.semestraltipo = res;
      });
    }
  }

  BuscarAnualTipo(tipo){
    const dateObj = new Date();
    const año = dateObj.getUTCFullYear();
    const path = 'RegistroPA';
    this.firestoreService.getCollectionUnicDescTriple<Registro>(path, 'año', año, 'tinvitado', tipo, 'tipo', 'Invitado').subscribe( res => {
      this.anualtipo = res;
    });
  }

}
