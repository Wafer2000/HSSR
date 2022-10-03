import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import {  Compromiso, Modelo, RegistroCS } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-compromisos',
  templateUrl: './compromisos.component.html',
  styleUrls: ['./compromisos.component.scss'],
})
export class CompromisosComponent implements OnInit {

  gimnasio: Compromiso[]=[];
  gim: Compromiso={
    id: '',
    idcupo: '',
    uid: '',
    hcupo: '',
    hora: '',
    fecha: '',
    tiempo: undefined,
    hinicial: '',
    hfinal: '',
    cant: 0,
    nombres: '',
    apellidos: '',
    resi: null,
    invi: null,
    numcasa: ''
  };

  parqueadero: Compromiso[]=[];
  parque: Compromiso={
    id: '',
    idcupo: '',
    uid: '',
    hcupo: '',
    hora: '',
    fecha: '',
    tiempo: undefined,
    hinicial: '',
    hfinal: '',
    cant: 0,
    nombres: '',
    apellidos: '',
    resi: null,
    invi: null,
    numcasa: ''
  };

  piscina: Compromiso[]=[];
  pis: Compromiso={
    id: '',
    idcupo: '',
    uid: '',
    hcupo: '',
    hora: '',
    fecha: '',
    tiempo: undefined,
    hinicial: '',
    hfinal: '',
    cant: 0,
    nombres: '',
    apellidos: '',
    resi: null,
    invi: null,
    numcasa: ''
  };

  recreacion: Compromiso[]=[];
  recre: Compromiso={
    id: '',
    idcupo: '',
    uid: '',
    hcupo: '',
    hora: '',
    fecha: '',
    tiempo: undefined,
    hinicial: '',
    hfinal: '',
    cant: 0,
    nombres: '',
    apellidos: '',
    resi: null,
    invi: null,
    numcasa: ''
  };

  actualizarGim: Modelo[] = [];
  actualizaGim: Modelo={
    id: '',
    hora: '',
    tipo: '',
    cupo: null,
    hinicial: '',
    hfinal: ''
  };

  actualizarPar: Modelo[] = [];
  actualizaPar: Modelo={
    id: '',
    hora: '',
    tipo: '',
    cupo: null,
    hinicial: '',
    hfinal: ''
  };

  actualizarPisc: Modelo[] = [];
  actualizaPisc: Modelo={
    id: '',
    hora: '',
    tipo: '',
    cupo: null,
    hinicial: '',
    hfinal: ''
  };

  actualizarRecre: Modelo[] = [];
  actualizaRecre: Modelo={
    id: '',
    hora: '',
    tipo: '',
    cupo: null,
    hinicial: '',
    hfinal: ''
  };

  code: any;

  datoscaneado: {};

  id: '';

  enableNuevo = false;

  constructor(
    public menucontroller: MenuController,
    public firestoreService: FirestoreService,
    public firebaseauthService: FirebaseauthService,
    public alertController: AlertController,
    public firestorageService: FirestorageService,
    private interaction: InteractionService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getCuposGimnasio();
    this.getCuposPiscina();
    this.getCuposRecreacion();
    this.getActualizarGim();
    this.getActualizarPisc();
    this.getActualizarRecre();
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

  getActualizarGim(){
    const path = 'MoldeHorarios';
    const tipo = 'Gimnasio';
    this.firestoreService.getCollectionUnic<Modelo>(path, 'tipo', tipo).subscribe(res =>{
      this.actualizarGim = res;
    });
  }

  getActualizarPisc(){
    const path = 'MoldeHorarios';
    const tipo = 'Piscina';
    this.firestoreService.getCollectionUnic<Modelo>(path, 'tipo', tipo).subscribe(res =>{
      this.actualizarPisc = res;
    });
  }

  getActualizarRecre(){
    const path = 'MoldeHorarios';
    const tipo = 'Recreacion';
    this.firestoreService.getCollectionUnic<Modelo>(path, 'tipo', tipo).subscribe(res =>{
      this.actualizarRecre = res;
    });
  }

  async getCuposGimnasio(){
    const uid = await this.firebaseauthService.getUid();
    const path = 'CompromisosGimnasio';
    this.firestoreService.getCollectionUnicDesc<Compromiso>(path, 'uid', uid).subscribe(res => {
      this.gimnasio = res;
      console.log(res);
    });
  }

  async getCuposPiscina(){
    const uid = await this.firebaseauthService.getUid();
    const path = 'CompromisosPiscina';
    this.firestoreService.getCollectionUnicDesc<Compromiso>(path, 'uid', uid).subscribe(res => {
      this.piscina = res;
      console.log(res);
    });
  }

  async getCuposRecreacion(){
    const uid = await this.firebaseauthService.getUid();
    const path = 'CompromisosRecreacion';
    this.firestoreService.getCollectionUnicDesc<Compromiso>(path, 'uid', uid).subscribe(res => {
      this.recreacion = res;
      console.log(res);
    });
  }

  async deleteCupoGim(compromiso, actualiza){
    this.interaction.presentLoading('Borrando...');
    const path = 'CompromisosGimnasio';
    const uid = await this.firebaseauthService.getUid();
    this.firestoreService.deleteDoc(path, compromiso.uid).then(res =>{
      console.log('Se borro->', res);
      const path1 = 'MoldeHorarios/Gimnasio/cupo/';
      this.firestoreService.deleteDoc(path1, compromiso.uid).then(res=>{
        console.log('Se elimino',res);
        const path2 = 'MoldeHorarios';
        let resul = 0;
        if(actualiza.cupo){
          resul = actualiza.cupo;
        };
        const actu = {
          cupo: resul-compromiso.cant
        };
        if(actu.cupo < 0){
          actu.cupo = 0;
        }
        this.firestoreService.updateDoc(path2, 'Gimnasio', actu).then(res =>{
          console.log('Se actualizo');
          const path3 = 'RegistroCS';
          const dateObj = new Date();
          const dia = dateObj.getUTCDate();
          const mes = dateObj.getUTCMonth() + 1;
          const año = dateObj.getUTCFullYear();
          const data: RegistroCS = {
            id: this.firestoreService.getId(),
            uid,
            fecha: new Date().toLocaleDateString('es-GB'),
            hora: new Date().toLocaleTimeString('en-US'),
            tiempo: new Date(),
            hinicial: compromiso.hinicial,
            hfinal: compromiso.hfinal,
            cant: compromiso.cant,
            nombres: compromiso.nombres,
            apellidos: compromiso.apellidos,
            services: 'Gimnasio',
            apartasino: 'Desaparto Cupo',
            resi: compromiso.resi,
            invi: compromiso.invi,
            numcasa: compromiso.numcasa,
            dia,
            mes,
            año,
            sem: mes>6 ? 2: 1,
            qui: dia>15 ? 2: 1,
          };
          this.firestoreService.createDoc(data, path3, data.id).then(res =>{
            this.interaction.closeLoading();
            this.interaction.presentToast('Borrado con exito');
          }).catch(err =>{
            this.interaction.closeLoading();
            this.interaction.presentToast('Un error ha ocurrido');
            console.log('Ocurrio un error ',err);
          });
        });
      }).catch(err =>{
        this.interaction.closeLoading();
        this.interaction.presentToast('Un error ha ocurrido');
        console.log('Ocurrio un error ',err);
      });
    }).catch(err =>{
      this.interaction.closeLoading();
      this.interaction.presentToast('Un error ha ocurrido');
      console.log('Ocurrio un error ',err);
    });
  }

  async deleteCupoPisc(compromiso, actualiza){
    this.interaction.presentLoading('Borrando...');
    const path = 'CompromisosPiscina';
    const uid = await this.firebaseauthService.getUid();
    this.firestoreService.deleteDoc(path, compromiso.uid).then(res =>{
      console.log('Se borro->', res);
      const path1 = 'MoldeHorarios/Piscina/cupo/';
      this.firestoreService.deleteDoc(path1, compromiso.uid).then(res=>{
        console.log('Se elimino',res);
        const path2 = 'MoldeHorarios';
        let resul = 0;
        if(actualiza.cupo){
          resul = actualiza.cupo;
        };
        const actu = {
          cupo: resul-compromiso.cant
        };
        if(actu.cupo < 0){
          actu.cupo = 0;
        }
        this.firestoreService.updateDoc(path2, 'Piscina', actu).then(res =>{
          console.log('Se actualizo');
          const path3 = 'RegistroCS';
          const dateObj = new Date();
          const dia = dateObj.getUTCDate();
          const mes = dateObj.getUTCMonth() + 1;
          const año = dateObj.getUTCFullYear();
          const data: RegistroCS = {
            id: this.firestoreService.getId(),
            uid,
            fecha: new Date().toLocaleDateString('es-GB'),
            hora: new Date().toLocaleTimeString('en-US'),
            tiempo: new Date(),
            hinicial: compromiso.hinicial,
            hfinal: compromiso.hfinal,
            cant: compromiso.cant,
            nombres: compromiso.nombres,
            apellidos: compromiso.apellidos,
            services: 'Piscina',
            apartasino: 'Desaparto Cupo',
            resi: compromiso.resi,
            invi: compromiso.invi,
            numcasa: compromiso.numcasa,
            dia,
            mes,
            año,
            sem: mes>6 ? 2: 1,
            qui: dia>15 ? 2: 1,
          };
          this.firestoreService.createDoc(data, path3, data.id).then(res =>{
            this.interaction.closeLoading();
            this.interaction.presentToast('Borrado con exito');
          }).catch(err =>{
            this.interaction.closeLoading();
            this.interaction.presentToast('Un error ha ocurrido');
            console.log('Ocurrio un error ',err);
          });
        });
      }).catch(err =>{
        this.interaction.closeLoading();
        this.interaction.presentToast('Un error ha ocurrido');
        console.log('Ocurrio un error ',err);
      });
    }).catch(err =>{
      this.interaction.closeLoading();
      this.interaction.presentToast('Un error ha ocurrido');
      console.log('Ocurrio un error ',err);
    });
  }

  async deleteCupoRecre(compromiso, actualiza){
    this.interaction.presentLoading('Borrando...');
    const path = 'CompromisosRecreacion';
    const uid = await this.firebaseauthService.getUid();
    this.firestoreService.deleteDoc(path, compromiso.uid).then(res =>{
      console.log('Se borro->', res);
      const path1 = 'MoldeHorarios/Recreacion/cupo/';
      this.firestoreService.deleteDoc(path1, compromiso.uid).then(res=>{
        console.log('Se elimino',res);
        const path2 = 'MoldeHorarios';
        let resul = 0;
        if(actualiza.cupo){
          resul = actualiza.cupo;
        };
        const actu = {
          cupo: resul-compromiso.cant
        };
        if(actu.cupo < 0){
          actu.cupo = 0;
        }
        this.firestoreService.updateDoc(path2, 'Recreacion', actu).then(res =>{
          console.log('Se actualizo');
          const path3 = 'RegistroCS';
          const dateObj = new Date();
          const dia = dateObj.getUTCDate();
          const mes = dateObj.getUTCMonth() + 1;
          const año = dateObj.getUTCFullYear();
          const data: RegistroCS = {
            id: this.firestoreService.getId(),
            uid,
            fecha: new Date().toLocaleDateString('es-GB'),
            hora: new Date().toLocaleTimeString('en-US'),
            tiempo: new Date(),
            hinicial: compromiso.hinicial,
            hfinal: compromiso.hfinal,
            cant: compromiso.cant,
            nombres: compromiso.nombres,
            apellidos: compromiso.apellidos,
            services: 'Recreacion',
            apartasino: 'Desaparto Cupo',
            resi: compromiso.resi,
            invi: compromiso.invi,
            numcasa: compromiso.numcasa,
            dia,
            mes,
            año,
            sem: mes>6 ? 2: 1,
            qui: dia>15 ? 2: 1,
          };
          this.firestoreService.createDoc(data, path3, data.id).then(res =>{
            this.interaction.closeLoading();
            this.interaction.presentToast('Borrado con exito');
          }).catch(err =>{
            this.interaction.closeLoading();
            this.interaction.presentToast('Un error ha ocurrido');
            console.log('Ocurrio un error ',err);
          });
        });
      }).catch(err =>{
        this.interaction.closeLoading();
        this.interaction.presentToast('Un error ha ocurrido');
        console.log('Ocurrio un error ',err);
      });
    }).catch(err =>{
      this.interaction.closeLoading();
      this.interaction.presentToast('Un error ha ocurrido');
      console.log('Ocurrio un error ',err);
    });
  }

}
