import { RegistroN } from './../models/models';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class PushnotificationService {

  constructor(
    public platform: Platform,
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService,
    private router: Router,
    private httpClient: HttpClient
    ) {
      this.stateUser();
    }
    
  stateUser(){
    this.firebaseauthService.stateAuth().subscribe(res =>{
      console.log(res);
      if(res !== null){
        this.inicializar();
      }
    });
  }

  inicializar(){
    if(this.platform.is("capacitor" || "android" || "ios")){
      PushNotifications.register();
      this.addListeners();
      PushNotifications.requestPermissions().then( result =>{
        console.log('PushNotifications.requestPermissions()');
        if(result.receive){
          console.log('Permisos concedidos');
          //register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
          this.addListeners();
        } else {
          //show some error
        }
      });
    } else{
      console.log('PushNotifications.requestPermissions() -> no es movil')
    }
  }

  addListeners(){
    PushNotifications.addListener('registration',
    (token: Token) => {
      console.log('El token es: ', token);
      this.guardarToken(token.value);
    });

    PushNotifications.addListener('registrationError',
    (error: any) => {
      console.log('Error on registration', error);
    });
    
    //primer plano
    PushNotifications.addListener('pushNotificationReceived',
    (notification: PushNotificationSchema) => {
      console.log('Push received: ', notification);
      LocalNotifications.schedule({
        notifications: [
          {
            title: notification.title,
            body: notification.body,
            id: 1,
            extra: {
              data: notification.data
            }
          }
        ]
      });
      const id = this.firestoreService.getId();
      const data: RegistroN = {
        titulo: notification.title,
        cuerpo: notification.body,
        id,
        data: notification.data,
        tipo: 'Notificación de inserción',
        tiempo: new Date(),
        fecha: new Date().toLocaleDateString('es-GB'),
        hora: new Date().toLocaleTimeString('en-US'),
      }
      this.firestoreService.createDoc(data, 'RegistroN', id).then(res=>{
        console.log(res)
      })
    });

    PushNotifications.addListener('pushNotificationActionPerformed',
    (notification: ActionPerformed) => {
      console.log('Push action performed en segundo plano: ', notification);
      this.router.navigate[notification.notification.data.enlace];
    });
  }

  async guardarToken(token: any){
    const uid = await this.firebaseauthService.getUid();
    if(uid){
      console.log('Guardar Token Firebase -> ', uid);
      const path = 'Usuarios';
      const userUpdate = {
        token,
      };
      this.firestoreService.updateDoc(path, uid, userUpdate);
      console.log('Guardar TokenFirebase()->', userUpdate, path, uid);
    }
  }

}
