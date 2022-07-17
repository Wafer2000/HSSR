import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { RegistroCS, Usuarios, RegistroSResi } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-piscina',
  templateUrl: './piscina.component.html',
  styleUrls: ['./piscina.component.scss'],
})
export class PiscinaComponent implements OnInit {

  diario: RegistroCS[] = [];
  diariocasa: RegistroCS[] = [];
  diarioindi: RegistroCS[] = [];
  semanal: RegistroCS[] = [];
  semanalcasa: RegistroCS[] = [];
  semanalindi: RegistroCS[] = [];
  quincenal: RegistroCS[] = [];
  quincenalcasa: RegistroCS[] = [];
  quincenalindi: RegistroCS[] = [];
  mensual: RegistroCS[] = [];
  mensualcasa: RegistroCS[] = [];
  mensualindi: RegistroCS[] = [];
  semestral: RegistroCS[] = [];
  semestralcasa: RegistroCS[] = [];
  semestralindi: RegistroCS[] = [];
  anual: RegistroCS[] = [];
  anualcasa: RegistroCS[] = [];
  anualindi: RegistroCS[] = [];
  
  usuarios: Usuarios[]=[];

  public selectedSegment: string='Diario';

  ESdiario: RegistroSResi[] = [];
  ESdiariocasa: RegistroSResi[] = [];
  ESdiarioindi: RegistroSResi[] = [];
  ESsemanal: RegistroSResi[] = [];
  ESsemanalcasa: RegistroSResi[] = [];
  ESsemanalindi: RegistroSResi[] = [];
  ESquincenal: RegistroSResi[] = [];
  ESquincenalcasa: RegistroSResi[] = [];
  ESquincenalindi: RegistroSResi[] = [];
  ESmensual: RegistroSResi[] = [];
  ESmensualcasa: RegistroSResi[] = [];
  ESmensualindi: RegistroSResi[] = [];
  ESsemestral: RegistroSResi[] = [];
  ESsemestralcasa: RegistroSResi[] = [];
  ESsemestralindi: RegistroSResi[] = [];
  ESanual: RegistroSResi[] = [];
  ESanualcasa: RegistroSResi[] = [];
  ESanualindi: RegistroSResi[] = [];
  
  ESusuarios: Usuarios[]=[];

  public ESselectedSegment: string='Diario';

  public ESselectedSegmentqui: string='1';
  public ESselectedSegmentsem: string='1';
  public ESselectedSegmentdia: string='1';
  public ESselectedSegmentwee: string='1';
  public ESselectedSegmentmen: string='1';
  public ESselectedSegmentanu: string='1';

  ESpersona: string;
  EScasa: string;

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
     this.ESUsuarios();
     this.ESTodos();
     this.Usuarios();
     this.Todos();
  }

  cerrar(){
    this.modalController.dismiss();
  }

  ESUsuarios(){
    this.firestoreService.getCollection<Usuarios>('Usuarios').subscribe( res => {
      console.log(res)
      this.ESusuarios = res;
    })
  }

  Usuarios(){
    this.firestoreService.getCollection<Usuarios>('Usuarios').subscribe( res => {
      console.log(res)
      this.usuarios = res;
    })
  }

  ESTodos(){
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const mes = dateObj.getUTCMonth() + 1;
    const año = dateObj.getUTCFullYear();
    const diasem = dateObj.getUTCDay();
    const diasemi = dia-diasem;
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicDescDouble<RegistroSResi>(path, 'dia', dia, 'services', 'Piscina').subscribe( res => {
      this.ESdiario = res;
    });
    this.firestoreService.getCollectionUnicMasDouble<RegistroSResi>(path, 'dia', diasemi, 'services', 'Piscina').subscribe( res => {
      this.ESsemanal = res;
    });
    if(dia>15){
      this.firestoreService.getCollectionUnicDescDouble<RegistroSResi>(path, 'qui', 2, 'services', 'Piscina').subscribe( res => {
        this.ESquincenal = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescDouble<RegistroSResi>(path, 'qui', 1, 'services', 'Piscina').subscribe( res => {
        this.ESquincenal = res;
      });
    }
    this.firestoreService.getCollectionUnicDescDouble<RegistroSResi>(path, 'mes', mes, 'services', 'Piscina').subscribe( res => {
      this.ESmensual = res;
    });
    if(mes>6){
      this.firestoreService.getCollectionUnicDescDouble<RegistroSResi>(path, 'sem', 2, 'services', 'Piscina').subscribe( res => {
        this.ESsemestral = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescDouble<RegistroSResi>(path, 'sem', 1, 'services', 'Piscina').subscribe( res => {
        this.ESsemestral = res;
      });
    }
    this.firestoreService.getCollectionUnicDescDouble<RegistroSResi>(path, 'año', año, 'services', 'Piscina').subscribe( res => {
      this.ESanual = res;
    });
  }

  Todos(){
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const mes = dateObj.getUTCMonth() + 1;
    const año = dateObj.getUTCFullYear();
    const diasem = dateObj.getUTCDay();
    const diasemi = dia-diasem;
    const path = 'RegistroCS';
    this.firestoreService.getCollectionUnicDescDouble<RegistroCS>(path, 'dia', dia, 'services', 'Piscina').subscribe( res => {
      this.diario = res;
    });
    this.firestoreService.getCollectionUnicMasDouble<RegistroCS>(path, 'dia', diasemi, 'services', 'Piscina').subscribe( res => {
      this.semanal = res;
    });
    if(dia>15){
      this.firestoreService.getCollectionUnicDescDouble<RegistroCS>(path, 'qui', 2, 'services', 'Piscina').subscribe( res => {
        this.quincenal = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescDouble<RegistroCS>(path, 'qui', 1, 'services', 'Piscina').subscribe( res => {
        this.quincenal = res;
      });
    }
    this.firestoreService.getCollectionUnicDescDouble<RegistroCS>(path, 'mes', mes, 'services', 'Piscina').subscribe( res => {
      this.mensual = res;
    });
    if(mes>6){
      this.firestoreService.getCollectionUnicDescDouble<RegistroCS>(path, 'sem', 2, 'services', 'Piscina').subscribe( res => {
        this.semestral = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescDouble<RegistroCS>(path, 'sem', 1, 'services', 'Piscina').subscribe( res => {
        this.semestral = res;
      });
    }
    this.firestoreService.getCollectionUnicDescDouble<RegistroCS>(path, 'año', año, 'services', 'Piscina').subscribe( res => {
      this.anual = res;
    });
  }

  ESsegmentChanged(event: any){
    console.log(event.target.value);
    this.ESselectedSegment=event.target.value
  }

  ESDiario(event: any){
    this.ESselectedSegmentdia=event.target.value
  }

  ESSemanal(event: any){
    this.ESselectedSegmentwee=event.target.value
  }

  ESQuincenal(event: any){
    this.ESselectedSegmentqui=event.target.value
  }

  ESMensual(event: any){
    this.ESselectedSegmentmen=event.target.value
  }

  ESSemestral(event: any){
    this.ESselectedSegmentsem=event.target.value
  }

  ESAnual(event: any){
    this.ESselectedSegmentanu=event.target.value
  }

  ESBuscarDiarioCasa(casa){
    console.log(casa);
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'dia', dia, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
      this.ESdiariocasa = res;
    });
    const path1 = 'RegistroCS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroCS>(path1, 'dia', dia, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
      this.diariocasa = res;
    });
  }

  ESBuscarDiarioIndi(persona){
    console.log(persona);
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'dia', dia, 'uid', persona, 'services', 'Piscina').subscribe( res => {
      this.ESdiarioindi = res;
    });
    const path1 = 'RegistroCS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroCS>(path1, 'dia', dia, 'uid', persona, 'services', 'Piscina').subscribe( res => {
      this.diarioindi = res;
    });
  }

  ESBuscarSemanalCasa(casa){
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const diasem = dateObj.getUTCDay();
    const diasem1 = dia-diasem;
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicMasTriple<RegistroSResi>(path, 'dia', diasem1, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
      this.ESsemanalcasa = res;
    });
    const path1 = 'RegistroCS';
    this.firestoreService.getCollectionUnicMasTriple<RegistroCS>(path1, 'dia', diasem1, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
      this.semanalcasa = res;
    });
  }

  ESBuscarSemanalIndi(persona){
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const diasem = dateObj.getUTCDay();
    const diasem1 = dia-diasem;
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicMasTriple<RegistroSResi>(path, 'dia', diasem1, 'uid', persona, 'services', 'Piscina').subscribe( res => {
      this.ESsemanalindi = res;
    });
    const path1 = 'RegistroCS';
    this.firestoreService.getCollectionUnicMasTriple<RegistroCS>(path1, 'dia', diasem1, 'uid', persona, 'services', 'Piscina').subscribe( res => {
      this.semanalindi = res;
    });
  }

  ESBuscarQuincenalCasa(casa){
    const path = 'RegistroS';
    const path1 = 'RegistroCS';
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    if(dia>15){
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'qui', 2, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
        this.ESquincenalcasa = res;
      });
      this.firestoreService.getCollectionUnicDescTriple<RegistroCS>(path1, 'qui', 2, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
        this.quincenalcasa = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'qui', 1, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
        this.ESquincenalcasa = res;
      });
      this.firestoreService.getCollectionUnicDescTriple<RegistroCS>(path1, 'qui', 1, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
        this.quincenalcasa = res;
      });
    }
  }

  ESBuscarQuincenalIndi(persona){
    const path = 'RegistroS';
    const path1 = 'RegistroCS';
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    if(dia>15){
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'qui', 1, 'uid', persona, 'services', 'Piscina').subscribe( res => {
        this.ESquincenalindi = res;
      });
      this.firestoreService.getCollectionUnicDescTriple<RegistroCS>(path1, 'qui', 2, 'uid', persona, 'services', 'Piscina').subscribe( res => {
        this.quincenalindi = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'qui', 2, 'uid', persona, 'services', 'Piscina').subscribe( res => {
        this.ESquincenalindi = res;
      });
      this.firestoreService.getCollectionUnicDescTriple<RegistroCS>(path1, 'qui', 1, 'uid', persona, 'services', 'Piscina').subscribe( res => {
        this.quincenalindi = res;
      });
    }
  }

  ESBuscarMensualCasa(casa){
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'mes', mes, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
      this.ESmensualcasa = res;
    });
    const path1 = 'RegistroCS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroCS>(path1, 'mes', mes, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
      this.mensualcasa = res;
    });
  }

  ESBuscarMensualIndi(persona){
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'mes', mes, 'uid', persona, 'services', 'Piscina').subscribe( res => {
      this.ESmensualindi = res;
    });
    const path1 = 'RegistroCS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroCS>(path1, 'mes', mes, 'uid', persona, 'services', 'Piscina').subscribe( res => {
      this.mensualindi = res;
    });
  }

  ESBuscarSemestralCasa(casa){
    const path = 'RegistroS';
    const path1 = 'RegistroCS';
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    if(mes>6){
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'sem', 2, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
        this.ESsemestralcasa = res;
      });
      this.firestoreService.getCollectionUnicDescTriple<RegistroCS>(path1, 'sem', 2, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
        this.semestralcasa = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'sem', 1, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
        this.ESsemestralcasa = res;
      });
      this.firestoreService.getCollectionUnicDescTriple<RegistroCS>(path1, 'sem', 1, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
        this.semestralcasa = res;
      });
    }
  }

  ESBuscarSemestralIndi(persona){
    const path = 'RegistroS';
    const path1 = 'RegistroCS';
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    if(mes>6){
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'sem', 1, 'uid', persona, 'services', 'Piscina').subscribe( res => {
        this.ESsemestralindi = res;
      });
      this.firestoreService.getCollectionUnicDescTriple<RegistroCS>(path1, 'sem', 1, 'uid', persona, 'services', 'Piscina').subscribe( res => {
        this.semestralindi = res;
      });
    }else{
      this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'sem', 2, 'uid', persona, 'services', 'Piscina').subscribe( res => {
        this.ESsemestralindi = res;
      });
      this.firestoreService.getCollectionUnicDescTriple<RegistroCS>(path1, 'sem', 2, 'uid', persona, 'services', 'Piscina').subscribe( res => {
        this.semestralindi = res;
      });
    }
  }

  ESBuscarAnualCasa(casa){
    const dateObj = new Date();
    const año = dateObj.getUTCFullYear();
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'año', año, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
      this.ESanualcasa = res;
    });
    const path1 = 'RegistroCS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroCS>(path1, 'año', año, 'numcasa', casa, 'services', 'Piscina').subscribe( res => {
      this.anualcasa = res;
    });
  }

  ESBuscarAnualIndi(persona){
    const dateObj = new Date();
    const año = dateObj.getUTCFullYear();
    const path = 'RegistroS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroSResi>(path, 'año', año, 'uid', persona, 'services', 'Piscina').subscribe( res => {
      this.ESanualindi = res;
    });
    const path1 = 'RegistroCS';
    this.firestoreService.getCollectionUnicDescTriple<RegistroCS>(path1, 'año', año, 'uid', persona, 'services', 'Piscina').subscribe( res => {
      this.anualindi = res;
    });
  }

}
