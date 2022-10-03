import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { IonDatetime, MenuController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Subscription } from 'rxjs';
import { Usuarios } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  dateValue = '';

  mostrar = true;

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

  newImage = '';

  newFile: any;

  uid = '';

  suscriberUserInfo: Subscription;

  ingresarEnable = true;

  passEnable = true;

  admin = false;

  constructor(
    private barcodeScanner: BarcodeScanner,
    public menucontroller: MenuController,
    private firestoreService: FirestoreService,
    public firestorageService: FirestorageService,
    public firebaseauthService: FirebaseauthService,
    private interaction: InteractionService,
    public router: Router
    ) {
      this.firebaseauthService.stateAuth().subscribe( res => {
        if (res !== null){
          this.uid = res.uid;
          this.getUserInfo(this.uid);
        } else {
          this.initRegistro();
        }
      });
    }

  openmenu(){
    console.log('Abrir Menu');
    this.menucontroller.toggle('menu');
  }

  formatDate(value: string) {
    return format(parseISO(value), 'dd/MM/yyyy');
  }

  ngOnInit() {
    this.verificar();
  }

  async verificar(){
    const veri = await this.firebaseauthService.getEmailVerified();
    if(veri==false){
      this.router.navigate(['/sendemail']);
      this.interaction.presentToast('Email No Verificado');
    }
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

  async newImageUpload(event: any){
    if(event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.registro.foto = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async guardarUser(){
    const path = 'Usuarios';
    if(this.registro.nombres === ''){
      this.interaction.presentToast('Digite los Nombres');
    }else if(this.registro.apellidos === ''){
      this.interaction.presentToast('Digite los Apellidos');
    }else if(this.registro.numidenti === ''){
      this.interaction.presentToast('Digite el Numero de Identidad');
    }else if(this.registro.email === ''){
      this.interaction.presentToast('Digite el Correo Electronico');
    }else if(this.registro.password === ''){
      this.interaction.presentToast('Digite la Contraseña');
    }else if(this.registro.fechanacimiento === ''){
      this.interaction.presentToast('Digite la Fecha de Nacimiento');
    }else if(this.registro.foto === ''){
      this.interaction.presentToast('Adjunte una Foto de Perfil');
    }else{
      const id = await this.firebaseauthService.getUid();
      this.registro.uid = id;
      const name = await this.firebaseauthService.getUid();
      if (this.newFile !== undefined){
        this.registro.foto = await this.firestorageService.uploadImage(this.newFile, path, name);
        if(this.registro.foto!=''){
          this.interaction.presentLoading('Actualizando...');
          await this.firestoreService.createDoc(this.registro, path, id).then(res=>{
            console.log('Guardando con exito', this.firebaseauthService.getUid());
            this.interaction.closeLoading();
            this.interaction.presentToast('Actualizado con exito');
          });
        }
      }
    }
  }

  async salir(){
    this.interaction.presentLoading('Cerrando Sesion...');
    this.firebaseauthService.logout();
    this.suscriberUserInfo.unsubscribe();
    this.interaction.closeLoading();
    this.router.navigate(['/usulog']);
    this.interaction.presentToast('Cerró sesion con exito');
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

  CodificarTexto(registro: Usuarios) {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, registro.uid).then(
        encodedData => {
          registro.uid = encodedData;
        },
        err => {
          this.interaction.closeLoading();
          this.interaction.presentToast('Un error ha ocurrido');
          console.log('Un error ha ocurrido: ', err);
        }
    );
  }

}
