import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ParqueaderoComponent } from './parqueadero/parqueadero.component';
import { PrincipalComponent } from './principal/principal.component';

@Component({
  selector: 'app-invitados',
  templateUrl: './invitados.component.html',
  styleUrls: ['./invitados.component.scss'],
})
export class InvitadosComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    ) { }

  ngOnInit() {}

  cerrar(){
    this.modalController.dismiss();
  }

  async presentModalParqueadero() {
    const modal = await this.modalController.create({
      component: PrincipalComponent,
      canDismiss: true,
    });
    return await modal.present();
  }

  async presentModalPrincipal() {
    const modal = await this.modalController.create({
      component: ParqueaderoComponent,
      canDismiss: true,
    });
    return await modal.present();
  }

}
