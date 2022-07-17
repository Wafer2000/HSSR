import { ResidentesComponent } from './residentes/residentes.component';
import { InvitadosComponent } from './invitados/invitados.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-entrasali',
  templateUrl: './entrasali.page.html',
  styleUrls: ['./entrasali.page.scss'],
})
export class EntrasaliPage implements OnInit {

  constructor(
    public menucontroller: MenuController,
    public modalController: ModalController,
    public firebaseauthService: FirebaseauthService,
    public router: Router
    ) { }

  ngOnInit() {
  }

  openmenu(){
    console.log('Abrir Menu');
    this.menucontroller.toggle('menu');
  }

  async presentModalResi() {
    const modal = await this.modalController.create({
      component: ResidentesComponent,
      mode: 'md',
      canDismiss: true,
    });
    return await modal.present();
  }

  async presentModalInvi() {
    const modal = await this.modalController.create({
      component: InvitadosComponent,
      mode: 'md',
      canDismiss: true,
    });
    return await modal.present();
  }

}


