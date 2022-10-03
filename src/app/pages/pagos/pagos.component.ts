import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Pagos, Usuarios } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
})

export class PagosComponent implements OnInit {

  pagos: Pagos[] = [];
  nuevo: Pagos = {
    id: '',
    numcomprob: null,
    identifi: null,
    canti: null,
    tiempo: undefined,
    estado: false,
    fecha: '',
    hora: '',
    uid: '',
    nombres: '',
    apellidos: '',
    motiv: '',
    causa: ''
  };

  usuarios: Usuarios[]=[];
  usuario: Usuarios = {
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

  enableNuevo = false;

  newImage = '';

  newFile: any;

  uid = '';
  nomb = '';
  apelli = '';
  private path = 'Pagos';

  suscriberUserInfo: Subscription;

  constructor(
    public menucontroller: MenuController,
    public firestoreService: FirestoreService,
    private interaction: InteractionService,
    public firebaseauthService: FirebaseauthService,
    public alertController: AlertController,
    public modalController: ModalController,
    public router: Router
) {}

  ngOnInit() {
    this.getPagosRecientes();
    this.getUsuario();
    this.verificar();
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

  async guardarPago(){
    if(this.nuevo.canti === null){
      this.interaction.closeLoading();
      this.interaction.presentToast('Debe digitar la cantidad abonada');
    }else if(this.nuevo.numcomprob === null){
        this.interaction.closeLoading();
        this.interaction.presentToast('Debe digitar el numero del comprobante');
    }else if(this.nuevo.motiv === ''){
      this.interaction.closeLoading();
      this.interaction.presentToast('Debe digitar su motivo de pago');
    }else{
      this.nuevo.estado = null;
      this.interaction.presentLoading('Subiendo Pago...');
      this.firestoreService.createDoc(this.nuevo, this.path, this.nuevo.id).then( res => {
        console.log('Subido con exito', res);
        this.interaction.closeLoading();
        this.interaction.presentToast('Subido con exito');
      }).catch( error => {
        this.interaction.closeLoading();
        this.interaction.presentToast('A ocurrido un Error');
        console.log('ERROR', error);
      });
      this.enableNuevo = false;
    };
  }

  async getPagosRecientes(){
    const uid = await this.firebaseauthService.getUid();
    const path = 'Pagos';
    this.firestoreService.getCollectionUnicDesc<Pagos>(path, 'uid', uid).subscribe(res => {
      this.pagos = res;
    });
  }

  async getUsuario(){
    const uid = await this.firebaseauthService.getUid();
    const path = 'Usuarios';
    this.firestoreService.getCollectionUnic<Usuarios>(path, 'uid', uid).subscribe(res => {
      this.usuarios = res;
    });
  }

  async nueva(nuevo?){
    const uid = await this.firebaseauthService.getUid();
    const id = this.firestoreService.getId();
    this.enableNuevo = true;
    this.nuevo = {
      id,
      numcomprob: null,
      identifi: nuevo.numidenti,
      canti: null,
      estado: null,
      tiempo: new Date(),
      fecha: new Date().toLocaleDateString('es-GB'),
      hora: new Date().toLocaleTimeString('en-US'),
      uid,
      nombres: nuevo.nombres,
      apellidos: nuevo.apellidos,
      motiv: '',
      causa: ''
    };
  }

}
