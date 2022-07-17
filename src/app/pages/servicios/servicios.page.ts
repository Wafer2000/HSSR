import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Modelo } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { GimnasioPage } from './gimnasio/gimnasio.page';
import { PiscinaPage } from './piscina/piscina.page';
import { RecreacionPage } from './recreacion/recreacion.page';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  gimnasio: Modelo[] = [];
  recreacion: Modelo[] = [];
  piscina: Modelo[] = [];

  constructor(
    public menucontroller: MenuController,
    private interaction: InteractionService,
    public modalController: ModalController,
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService,
    public router: Router
    ) { }

  ngOnInit() {
    this.verificar();
    this.getCupoGimnasio();
    this.getCupoRecreacion();
    this.getCupoPiscina();
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

  getCupoGimnasio(){
    const clase = 'Gimnasio';
    const path = 'MoldeHorarios';
    this.firestoreService.getCollectionUnic<Modelo>(path, 'tipo', clase).subscribe(res => {
      this.gimnasio = res;
      console.log(res);
    });
  }

  getCupoRecreacion(){
    const clase = 'Recreacion';
    const path = 'MoldeHorarios';
    this.firestoreService.getCollectionUnic<Modelo>(path, 'tipo', clase).subscribe(res => {
      this.recreacion = res;
      console.log(res);
    });
  }

  getCupoPiscina(){
    const clase = 'Piscina';
    const path = 'MoldeHorarios';
    this.firestoreService.getCollectionUnic<Modelo>(path, 'tipo', clase).subscribe(res => {
      this.piscina = res;
      console.log(res);
    });
  }

  async presentModalGim() {
    const modal = await this.modalController.create({
      component: GimnasioPage,
      mode: 'md',
      canDismiss: true,
    });
    return await modal.present();
  }

  async presentModalRecre() {
    const modal = await this.modalController.create({
      component: RecreacionPage,
      mode: 'md',
      canDismiss: true,
    });
    return await modal.present();
  }

  async presentModalPisc() {
    const modal = await this.modalController.create({
      component: PiscinaPage,
      mode: 'md',
      canDismiss: true,
    });
    return await modal.present();
  }

}


