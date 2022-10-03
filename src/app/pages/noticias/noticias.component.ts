import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Noticias, Usuarios } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  noticias: Noticias[] = [];

  nuevo: Noticias= {
    mensaje: '',
    encabezado: '',
    tiempo: new Date(),
    id: this.firestoreService.getId(),
    fecha: '',
    hora: ''
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

  enableNuevo = false;

  suscriberUserInfo: Subscription;

  ingresarEnable = true;

  passEnable = true;

  admin = false;

  uid = '';

  private path = 'Noticias';

  constructor(
              public menucontroller: MenuController,
              public firestoreService: FirestoreService,
              public alertController: AlertController,
              public firebaseauthService: FirebaseauthService,
              private interaction: InteractionService,
              public router: Router
  ) {
    this.firebaseauthService.stateAuth().subscribe( res => {
      if (res !== null){
        this.uid = res.uid;
        this.getUserInfo(this.uid);
      } else {
        this.router.navigate['/usulog'];
        this.initRegistro();
      }
    });
  }

  initRegistro(){
    this.uid = '';
    this.registro = {
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
    console.log(this.registro);
  }

  ngOnInit() {
    this.getNoticiasRecientes();
    this.verificar();
  }

  getUserInfo(uid: string){
    console.log('getUserInfo');
    const path = 'Usuarios';
    this.suscriberUserInfo = this.firestoreService.getDoc<Usuarios>(path, this.uid).subscribe(async res =>{
      this.registro = res;
      const uid = await this.firebaseauthService.getUid();
      if(uid=='Q82Ekgrmn3fOuPa4sNscu0KKeLj1'){
        this.admin = true;
      }
    });
  }

  async verificar(){
    const veri = await this.firebaseauthService.getEmailVerified();
    if(veri==false){
      this.router.navigate(['/sendemail']);
      this.interaction.presentToast('Email No Verificado');
    }
  }

  getNoticiasRecientes(){
    this.firestoreService.getCollectionTodos<Noticias>(this.path).subscribe(res => {
      this.noticias = res;
      console.log(res);
    });
  }

  openmenu(){
    console.log('Abrir Menu');
    this.menucontroller.toggle('menu');
  }

}
