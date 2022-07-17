import { PushnotificationService } from './services/pushnotification.service';
import { LocalnotificationService } from './services/localnotification.service';
import { Platform } from '@ionic/angular';
import { FirebaseauthService } from './services/firebaseauth.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Usuarios } from './models/models';
import { FirestoreService } from './services/firestore.service';
import { FirestorageService } from './services/firestorage.service';
import { InteractionService } from './services/interaction.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

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

  newImage = '';

  newFile: any;

  uid = '';

  suscriberUserInfo: Subscription;

  ingresarEnable = false;

  admin = false;

  constructor(
    private interaction: InteractionService,
    private platform: Platform,
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService,
    public firestorageService: FirestorageService,
    private localnotificationService: LocalnotificationService,
    private pushnotificationService: PushnotificationService,
    public router: Router
    ) {
      this.initializeApp();
      this.firebaseauthService.stateAuth().subscribe( res => {
        if (res !== null){
          this.uid = res.uid;
          this.getUserInfo(this.uid);
        } else {
          this.initRegistro();
        }
      });
    }

  initializeApp() {
    this.platform.ready().then(() =>{
      this.getUid();
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
  getUserInfo(uid: string){
    console.log('getUserInfo');
    const path = 'Usuarios';
    this.suscriberUserInfo = this.firestoreService.getDoc<Usuarios>(path, this.uid).subscribe(res =>{
      this.registro = res;
    });
  }

  getUid(){
    this.firebaseauthService.stateAuth().subscribe( res =>{
      if (res !== null) {
        if (res.uid === 'Q82Ekgrmn3fOuPa4sNscu0KKeLj1'){
          this.admin = true;
          this.router.navigate(['/adnoticias']);
          console.log('Bienvenido Administrador');
        }else {
          this.admin = false;
          this.router.navigate(['/noticias']);
          console.log('Bienvenido Residente');
        }
      } else{
        this.admin = false;
      }
    });
  }

}
