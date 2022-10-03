import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Dudas, Usuarios } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.scss'],
})
export class RespuestasComponent implements OnInit {

  pagos: Dudas[] = [];
  nuevo: Dudas = {
    id: '',
    uidresi: '',
    nomresi: '',
    apellresi: '',
    pregunta: '',
    respuesta: '',
    estado: false,
    tiempo: new Date(),
    fecha: '',
    hora: '',
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
  private path = 'Dudas';

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
    this.getDudasRecientes();
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

  async guardarDuda(){
    if(this.nuevo.pregunta === null){
      this.interaction.closeLoading();
      this.interaction.presentToast('Debe colocar su pregunta o incognita');
    }else{
      this.nuevo.estado = false;
      this.interaction.presentLoading('Subiendo Pago...');
      const data = {
        estado: true,
        respuesta: this.nuevo.respuesta,
      }
      this.firestoreService.updateDoc(this.path, this.nuevo.id, data).then( res => {
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

  async getDudasRecientes(){
    const uid = await this.firebaseauthService.getUid();
    const path = 'Dudas';
    this.firestoreService.getCollectionTodos<Dudas>(path).subscribe(res => {
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
      uidresi: uid,
      nomresi: nuevo.nombres,
      apellresi: nuevo.apellidos,
      pregunta: '',
      respuesta: '',
      estado: false,
      tiempo: new Date(),
      fecha: new Date().toLocaleDateString('es-GB'),
      hora: new Date().toLocaleTimeString('en-US'),
    };
  }

}
