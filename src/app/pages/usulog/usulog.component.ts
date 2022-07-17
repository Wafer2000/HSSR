import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuarios } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { MenuController } from '@ionic/angular';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-usulog',
  templateUrl: './usulog.component.html',
  styleUrls: ['./usulog.component.scss'],
})
export class UsulogComponent implements OnInit {

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
    public menucontroller: MenuController,
    private firestoreService: FirestoreService,
    public firebaseauthService: FirebaseauthService,
    private interaction: InteractionService,
    public router: Router
    ) {
      this.firebaseauthService.stateAuth().subscribe( res => {
        if (res !== null){
          this.uid = res.uid;
          this.getUserInfo(this.uid);
          this.router.navigate['/noticias'];
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

  ngOnInit() {}

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

  async registrarse(){
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
    }else{
      const res = await this.firebaseauthService.registrar(this.registro).catch( error => {
        this.interaction.presentLoading('Guardando...');
        this.interaction.closeLoading();
        this.interaction.presentToast('Digite una Cuenta diferente');
        console.log('Error-> ', error);
      });
      if(res){
        this.router.navigate(['/sendemail']);
        console.log('Exito al crear usuario');
        const path = 'Usuarios';
        const uid = res.user.uid;
        this.registro.uid = uid;
        await this.firestoreService.createDoc(this.registro, path, uid).then(res =>{
          console.log('Guardando con exito',res);
          this.interaction.closeLoading();
        });
      }
    }
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

  async ingresar(){
    const credenciales = {
      email: this.registro.email,
      password: this.registro.password,
    };
    if(this.registro.email === ''){
      this.interaction.presentToast('Digite el Correo Electronico');
    }else if(this.registro.password === ''){
      this.interaction.presentToast('Digite la Contraseña');
    }else{
      this.interaction.presentLoading('Iniciando Sesion...');
      const res = await this.firebaseauthService.login(credenciales.email, credenciales.password).then( res => {
        console.log('Ingresó con exito');
        this.interaction.closeLoading();
        this.interaction.presentToast('Inició sesion con exito');
        if(res && res.user.emailVerified){
          this.router.navigate(['/noticias']);
        } else if(res && !res.user.emailVerified){
          this.router.navigate(['/sendemail']);
        }
      }).catch( error => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Digite la Cuenta y Contraseña de manera correcta');
        console.log('ERROR', error);
      });
    }

  }

}
