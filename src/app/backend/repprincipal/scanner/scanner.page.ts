import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { MenuController, AlertController, ModalController } from '@ionic/angular';
import { Invitados, Usuarios, RegistroPPrincipalInvi, RegistroPPrincipalResi } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  nombin = '';
  apelliin = '';
  nombre = '';
  apellire = '';
  invitado = false;
  residente = false;
  code: any;
  datoscaneado: {};

  invitados: Invitados[] = [];
  nuevo: Invitados = {
    id: '',
    tiempo: new Date(),
    estado: null,
    fecha: '',
    hora: '',
    residente: '',
    rnombres: '',
    rapellidos: '',
    inombres: '',
    iapellidos: '',
    finvitado: null,
    cedula: null,
    tipo: ''
  };

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

  resgisinvitadosen: RegistroPPrincipalInvi[] = [];
  resgisinvien: RegistroPPrincipalInvi;

  resgisresidenteen: RegistroPPrincipalResi[] = [];
  resgisresien: RegistroPPrincipalResi;

  resgisinvitadossa: RegistroPPrincipalInvi[] = [];
  resgisinvisa: RegistroPPrincipalInvi;

  resgisresidentesa: RegistroPPrincipalResi[] = [];
  resgisresisa: RegistroPPrincipalResi;

  constructor(
              private barcodeScanner: BarcodeScanner,
              public menucontroller: MenuController,
              public firestoreService: FirestoreService,
              public alertController: AlertController,
              private interaction: InteractionService,
              public modalController: ModalController,
              ) { }

  ngOnInit() {}

  openmenu(){
    console.log('Abrir Menu');
    this.menucontroller.toggle('menu');
  }

  scaner(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      console.log('Barcode data', this.code);
      if(this.code !== null){
        this.interaction.presentLoading('Buscando...');
        this.getInvitado(this.code);
        this.getResidente(this.code);
      }
    }).catch(error => {
      this.interaction.closeLoading();
      this.interaction.presentToast('A ocurrido un Error');
      console.log('ERROR', error);
    });
  }

  async getInvitado(id: string){
    const path = 'Invitados';
    this.datoscaneado = id;
    this.firestoreService.getCollectionUnic<Invitados>(path, 'id', this.datoscaneado).subscribe(res => {
      this.invitado = true;
      this.invitados = res;
    });
  }

  async getResidente(uid: string){
    const path = 'Usuarios';
    this.datoscaneado = uid;
    this.firestoreService.getCollectionUnic<Usuarios>(path, 'uid', this.datoscaneado).subscribe(res => {
      this.residente = true;
      this.usuarios = res;
    });
  }

  async nuevainvien(nuevos: Invitados){
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    const dia = dateObj.getUTCDate();
    const año = dateObj.getUTCFullYear();
    this.resgisinvien = {
      id: this.firestoreService.getId(),
      uid: nuevos.id,
      tiempo: new Date(),
      fecha: new Date().toLocaleDateString('es-GB'),
      hora: new Date().toLocaleTimeString('en-US'),
      nombres: nuevos.inombres,
      apellidos: nuevos.iapellidos,
      tipo: 'Invitado',
      entrasali: 'Entro',
      cedula: nuevos.cedula,
      finvitado: nuevos.finvitado,
      tinvitado: nuevos.tipo,
      dia,
      mes,
      año,
      sem: mes>6 ? 2: 1,
      wee: null,
      qui: dia>15 ? 2: 1
    };
  }

  async nuevaresien(nueves?: Usuarios){
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    const dia = dateObj.getUTCDate();
    const año = dateObj.getUTCFullYear();
    this.resgisresien = {
      id: this.firestoreService.getId(),
      uid: nueves.uid,
      tiempo: new Date(),
      fecha: new Date().toLocaleDateString('es-GB'),
      hora: new Date().toLocaleTimeString('en-US'),
      nombres: nueves.nombres,
      apellidos: nueves.apellidos,
      tipo: 'Residente',
      entrasali: 'Entro',
      dia,
      mes,
      año,
      sem: mes>6 ? 2: 1,
      wee: null,
      qui: dia>15 ? 2: 1,
      numcasa: nueves.casa
    };
  }

  async nuevainvisa(nuevos: Invitados){
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    const dia = dateObj.getUTCDate();
    const año = dateObj.getUTCFullYear();
    this.resgisinvisa = {
      id: this.firestoreService.getId(),
      uid: nuevos.id,
      tiempo: new Date(),
      fecha: new Date().toLocaleDateString('es-GB'),
      hora: new Date().toLocaleTimeString('en-US'),
      nombres: nuevos.inombres,
      apellidos: nuevos.iapellidos,
      tipo: 'Invitado',
      entrasali: 'Salio',
      cedula: nuevos.cedula,
      finvitado: nuevos.finvitado,
      tinvitado: nuevos.tipo,
      dia,
      mes,
      año,
      sem: mes>6 ? 2: 1,
      wee: null,
      qui: dia>15 ? 2: 1
    };
  }

  async nuevaresisa(nueves: Usuarios){
    const dateObj = new Date();
    const mes = dateObj.getUTCMonth() + 1;
    const dia = dateObj.getUTCDate();
    const año = dateObj.getUTCFullYear();
    this.resgisresisa = {
      id: this.firestoreService.getId(),
      uid: nueves.uid,
      tiempo: new Date(),
      fecha: new Date().toLocaleDateString('es-GB'),
      hora: new Date().toLocaleTimeString('en-US'),
      nombres: nueves.nombres,
      apellidos: nueves.apellidos,
      tipo: 'Residente',
      entrasali: 'Salio',
      dia,
      mes,
      año,
      sem: mes>6 ? 2: 1,
      wee: null,
      qui: dia>15 ? 2: 1,
      numcasa: nueves.casa
    };
  }

  EntradaInvi(nuevos: Invitados){
    const path = 'RegistroPP';
    this.nuevainvien(nuevos);
    if(nuevos.estado === null){
      this.interaction.presentToast('No puede entrar el invitado');
    }else if(nuevos.estado === false){
      this.interaction.closeLoading();
      this.interaction.presentToast('No puede entrar el invitado');
    }else if(nuevos.estado === true){
      this.interaction.presentLoading('Agregando Invitado...');
      this.firestoreService.createDoc(this.resgisinvien, path, this.resgisinvien.id).then( res => {
        console.log('Subido con exito', res);
        this.interaction.closeLoading();
        this.interaction.presentToast('Entro con exito');
        const data = {
          posi : true
        }
        this.firestoreService.updateDoc('Usuarios', this.resgisresien.uid, data).then( res => {
          
        })
      }).catch( error => {
        this.interaction.closeLoading();
            this.interaction.presentToast('Un error ha ocurrido');
            console.log('Un error ha ocurrido: ', error);
      });
    };
  }

  deleteInvi(nuevos: Invitados){
    console.log('Se eliminara');
    const path = 'Invitados';
    this.firestoreService.deleteDoc(path, nuevos.id).then(res =>{
      console.log('Se borro->',res);
    });
  }

  SalidaInvi(nuevos: Invitados){
    this.interaction.presentLoading('Registrado Invitado...');
    const path = 'RegistroPP';
    this.nuevainvisa(nuevos);
    this.firestoreService.createDoc(this.resgisinvisa, path, this.resgisinvisa.id).then( res => {
      console.log('Subido con exito', res);
      this.interaction.closeLoading();
      this.interaction.presentToast('Salio con exito');
    }).catch( error => {
      this.interaction.closeLoading();
          this.interaction.presentToast('Un error ha ocurrido');
          console.log('Un error ha ocurrido: ', error);
    });

  }

  EntradaResi(nueves: Usuarios){
    this.interaction.presentLoading('Agregando Invitado...');
    const path = 'RegistroPP';
    this.nuevaresien(nueves);
    this.firestoreService.createDoc(this.resgisresien, path, this.resgisresien.id).then( res => {
      console.log('Subido con exito');
      const data = {
        posi : true
      }
      this.firestoreService.updateDoc('Usuarios', this.resgisresien.uid, data).then( res => {
        console.log('Subido con exito', res);
        this.interaction.closeLoading();
        this.interaction.presentToast('Entro con exito');
      })
    }).catch( error => {
      this.interaction.closeLoading();
          this.interaction.presentToast('Un error ha ocurrido');
          console.log('Un error ha ocurrido: ', error);
    });
  }

  SalidaResi(nueves: Usuarios){
    this.interaction.presentLoading('Registrado Invitado...');
    const path = 'RegistroPP';
    this.nuevaresisa(nueves);
    this.firestoreService.createDoc(this.resgisresisa, path, this.resgisresisa.id).then( res => {
      console.log('Subido con exito');
      const data = {
        posi : false
      }
      this.firestoreService.updateDoc('Usuarios', this.resgisresien.uid, data).then( res => {
        console.log('Subido con exito', res);
        this.interaction.closeLoading();
        this.interaction.presentToast('Entro con exito');
      })
    }).catch( error => {
      this.interaction.closeLoading();
          this.interaction.presentToast('Un error ha ocurrido');
          console.log('Un error ha ocurrido: ', error);
    });
  }

}
