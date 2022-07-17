import { HorariosEsca, Modelo } from './../../../models/models';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { MenuController, AlertController, ModalController } from '@ionic/angular';
import { RegistroSResi, Usuarios } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  horarios: HorariosEsca[]=[];
  horario: HorariosEsca = {
    id: '',
    uid: '',
    idcupo: '',
    fecha: '',
    hora: '',
    tiempo: undefined,
    hcupo: '',
    dispo: null,
    cant: null,
    hinicial: '',
    hfinal: '',
    nombres: '',
    apellidos: '',
    numcasa: '',
    resi: null,
    invi: null
  };

  nombre = '';
  apellire = '';
  invitado = false;
  residente = false;
  code: any;
  datoscaneado: {};

  usuarios: Usuarios[] = [];
  registro: Usuarios = {
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    casa: '',
    fechanacimiento: '',
    foto: '',
    uid: '',
    numidenti: null,
    posi: null
  };

  resgisresidenteen: RegistroSResi[] = [];
  resgisresien: RegistroSResi;

  resgisresidentesa: RegistroSResi[] = [];
  resgisresisa: RegistroSResi;

  actualizar: Modelo[] = [];
  actu: Modelo;

  constructor(
              private barcodeScanner: BarcodeScanner,
              public menucontroller: MenuController,
              public firestoreService: FirestoreService,
              public alertController: AlertController,
              private interaction: InteractionService,
              public modalController: ModalController,
              ) { }

  ngOnInit() {
    this.getActualizar();
  }

  openmenu(){
    console.log('Abrir Menu');
    this.menucontroller.toggle('menu');
  }

  scaner(){
    this.interaction.presentLoading('Buscando...');
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      console.log('Barcode data', this.code);
      if(this.code !== null){
        this.getResidente(this.code);
      }
    }).catch(error => {
      this.interaction.closeLoading();
      this.interaction.presentToast('A ocurrido un Error');
      console.log('ERROR', error);
    });
  }

  async getResidente(uid){
    const path = 'CompromisosGimnasio';
    this.datoscaneado = uid;
    this.firestoreService.getCollectionUnic<HorariosEsca>(path, 'uid', this.datoscaneado).subscribe(res => {
      this.horarios = res;
    });
  }

  getActualizar(){
    const path = 'MoldeHorarios';
    const tipo = 'Gimnasio';
    this.firestoreService.getCollectionUnic<Modelo>(path, 'tipo', tipo).subscribe(res =>{
      this.actualizar = res;
      console.log(this.actualizar);
    });
  }

  async nuevaresien(horario: HorariosEsca){
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const mes = dateObj.getUTCMonth() + 1;
    const año = dateObj.getUTCFullYear();
    this.resgisresien = {
      id: this.firestoreService.getId(),
      uid: horario.uid,
      tiempo: new Date(),
      fecha: new Date().toLocaleDateString('es-GB'),
      hora: new Date().toLocaleTimeString('en-US'),
      services: 'Gimnasio',
      entrasali: 'Entro',
      nombres: horario.nombres,
      apellidos: horario.apellidos,
      resi: horario.resi,
      invi: horario.invi,
      numcasa: horario.numcasa,
      dia,
      mes,
      año,
      sem: mes>6 ? 2: 1,
      qui: dia>15 ? 2: 1,
      
    };
  }

  async nuevaresisa(horario: HorariosEsca){
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const mes = dateObj.getUTCMonth() + 1;
    const año = dateObj.getUTCFullYear();
    this.resgisresisa = {
      id: this.firestoreService.getId(),
      uid: horario.uid,
      tiempo: new Date(),
      fecha: new Date().toLocaleDateString('es-GB'),
      hora: new Date().toLocaleTimeString('en-US'),
      services: 'Gimnasio',
      entrasali: 'Salio',
      nombres: horario.nombres,
      apellidos: horario.apellidos,
      numcasa: horario.numcasa,
      resi: horario.resi,
      invi: horario.invi,
      dia,
      mes,
      año,
      sem: mes>6 ? 2: 1,
      qui: dia>15 ? 2: 1,
    };
  }

  EntradaResi(horario: HorariosEsca){

    const timei = horario.hinicial ;
    var dti = new Date('1990-01-01 '+timei);
    var dti = new Date(new Date().toISOString().slice(0,10) + ' ' + timei);
    console.log(dti);

    const timef = horario.hfinal ;
    var dtf = new Date('1990-01-01 '+timef);
    var dtf = new Date(new Date().toISOString().slice(0,10) + ' ' + timef);
    console.log(dtf);

    const local = new Date().toLocaleTimeString('en-CO');
    var dtl = new Date('1990-01-01 '+local);
    var dtl = new Date(new Date().toISOString().slice(0,10) + ' ' + local);
    console.log(dtl);

    if(dti>dtl){
      console.log('No puede ingresar, es temprano');
      this.interaction.presentToast('No puede ingresar, es muy pronto');
    }else if(dtf<dtl){
      console.log('No puede ingresar, es tarde');
      this.interaction.presentToast('No puede ingresar, es muy tarde');
    }else if(dti<dtl||dtl<dtf){
      console.log('Puede ingresar');
      this.interaction.presentLoading('Agregando Invitado...');
      const path = 'RegistroS';
      this.nuevaresien(horario);
      this.firestoreService.createDoc(this.resgisresien, path, this.resgisresien.id).then( res => {
        console.log('Subido con exito', res);
        this.interaction.closeLoading();
        this.interaction.presentToast('Entro con exito');
      }).catch( error => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Un error ha ocurrido');
        console.log('Un error ha ocurrido: ', error);
      });
    }
  }

  deleteResiSali(horario: HorariosEsca){
    const path = 'CompromisosGimnasio';
    this.firestoreService.deleteDoc(path, horario.uid).then(res =>{
      console.log('Se borro -> ', res);
      const path1 = 'MoldeHorarios/Gimnasio/cupo/';
      this.firestoreService.deleteDoc(path1, horario.uid).then(res =>{
      console.log('Se borro -> ', res);
      });
    });
  }

  SalidaResi(horario: HorariosEsca, actualiza){

    const timei = horario.hinicial ;
    let dti = new Date('1990-01-01 '+timei);

    console.log(dti);
    dti = new Date(new Date().toISOString().slice(0,10) + ' ' + timei);
    console.log(dti);

    const timef = horario.hfinal ;
    let dtf = new Date('1990-01-01 '+timef);

    console.log(dtf);
    dtf = new Date(new Date().toISOString().slice(0,10) + ' ' + timef);
    console.log(dtf);

    const local = new Date().toLocaleTimeString('en-US');
    console.log(local);
    const dtl = new Date('1990-01-01 '+local);
    console.log(dtl);

    if(dti<dtl){
      console.log('No puede ingresar, es temprano');
      this.interaction.presentToast('No se le puede realizar registros');
    }else{
      this.interaction.presentLoading('Registrado Invitado...');
      const path = 'RegistroS';
      this.nuevaresisa(horario);
      this.firestoreService.createDoc(this.resgisresisa, path, this.resgisresisa.id).then( res => {
        console.log('Subido con exito', res);
        this.interaction.closeLoading();
        this.interaction.presentToast('Salio con exito');
        this.deleteResiSali(horario);
        const path2 = 'MoldeHorarios';
        let resul = 0;
        if(actualiza.cupo){
          resul = actualiza.cupo;
        };
        const actu = {
          cupo: resul-horario.cant
        };
        if(actu.cupo < 0){
          actu.cupo = 0;
        }
        this.firestoreService.updateDoc(path2, 'Gimnasio', actu);
      }).catch( error => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Un error ha ocurrido');
        console.log('Un error ha ocurrido: ', error);
      });
     }
  }

}
