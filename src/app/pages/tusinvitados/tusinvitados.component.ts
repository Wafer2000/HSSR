import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { MenuController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Invitados, Usuarios } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-tusinvitados',
  templateUrl: './tusinvitados.component.html',
  styleUrls: ['./tusinvitados.component.scss'],
})
export class TusinvitadosComponent implements OnInit {

  code: any;

  datoscaneado: {};

  enableNuevo = false;

  invitados: Invitados[] = [];

  registro: Usuarios []=[];

  nuevo: Invitados;
  uid = '';
  nomb = '';
  apelli = '';
  suscriberUserInfo: Subscription;

  constructor(
    private barcodeScanner: BarcodeScanner,
    public menucontroller: MenuController,
    public firestoreService: FirestoreService,
    public firebaseauthService: FirebaseauthService,
    public alertController: AlertController,
    public firestorageService: FirestorageService,
    private interaction: InteractionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.gefinvitado();
    this.verificar();
    this.getUserInfo();
  }

  async verificar(){
    const veri = await this.firebaseauthService.getEmailVerified();
    if(veri==false){
      this.router.navigate(['/sendemail']);
      this.interaction.presentToast('Email No Verificado');
    }
  }

  openmenu(){
    console.log('Abrir Menu');
    this.menucontroller.toggle('menu');
  }

  async getUserInfo(){
    const uid = await this.firebaseauthService.getUid();
    const path = 'Usuarios';
    this.firestoreService.getCollectionUnic<Usuarios>(path, 'uid' ,uid).subscribe(res =>{
      this.registro = res;
    });
  }

  async nueva(){
    const uid = await this.firebaseauthService.getUid();
    this.nuevo = {
      id: this.firestoreService.getId(),
      estado: false,
      tiempo: new Date(),
      fecha: new Date().toLocaleDateString('es-GB'),
      hora: new Date().toLocaleTimeString('en-US'),
      rnombres: '',
      rapellidos: '',
      inombres: '',
      iapellidos: '',
      finvitado: false,
      residente: uid,
      cedula: null,
      tipo: ''
    };
  }

  async gefinvitado(){
    const uid = await this.firebaseauthService.getUid();
    this.nueva();
    const path = 'Invitados';
    this.firestoreService.getCollectionUnicDesc<Invitados>(path, 'residente', uid).subscribe(res => {
      this.invitados = res;
    });
  }

  async crearInvitado(registros: Usuarios){
    const path = 'Invitados';
    this.nuevo.rnombres = registros.nombres;
    this.nuevo.rapellidos = registros.apellidos;
    if(this.nuevo.finvitado === null){
      this.interaction.presentToast('Digite el Tipo de Invitado');
    }else if(this.nuevo.inombres === ''){
      this.interaction.presentToast('Digite los Nombres del Invitado');
    }else if(this.nuevo.iapellidos === ''){
      this.interaction.presentToast('Digite los Apellidos del Invitado');
    }else if(this.nuevo.tipo === ''){
      this.interaction.presentToast('Digite el Tipo de Invitado');
    }else{
      this.interaction.presentLoading('Agregando Invitado...');
      this.firestoreService.createDoc(this.nuevo, path, this.nuevo.id).then( res => {
        console.log('Subido con exito', res);
        this.interaction.closeLoading();
        this.interaction.presentToast('Agregado con exito');
      }).catch( error => {
        this.interaction.closeLoading();
            this.interaction.presentToast('Un error ha ocurrido');
            console.log('Un error ha ocurrido: ', error);
      });
      this.enableNuevo = false;
    };
  }

  CodificarTexto(nuevos: Invitados) {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, nuevos.id).then(
        encodedData => {
          nuevos.id = encodedData;
        },
        err => {
          this.interaction.closeLoading();
          this.interaction.presentToast('Un error ha ocurrido');
          console.log('Un error ha ocurrido: ', err);
        }
    );
  }

  deleteInvitados(nuevos: Invitados){
    this.interaction.presentLoading('Borrando Invitado...');
    const path = 'Invitados';
    this.firestoreService.deleteDoc(path, nuevos.id);
    this.interaction.closeLoading();
    this.interaction.presentToast('Borrado con exito');
  }

}
