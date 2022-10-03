import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GimnasioComponent } from './gimnasio/gimnasio.component';
import { PiscinaComponent } from './piscina/piscina.component';
import { RecreacionComponent } from './recreacion/recreacion.component';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  constructor(
    public modalController: ModalController,
    ) { }

  ngOnInit() {}

  cerrar(){
    this.modalController.dismiss();
  }

  async presentModalGimnasio() {
    const modal = await this.modalController.create({
      component: GimnasioComponent,
      canDismiss: true,
    });
    return await modal.present();
  }

  async presentModalPiscina() {
    const modal = await this.modalController.create({
      component: PiscinaComponent,
      canDismiss: true,
    });
    return await modal.present();
  }

  async presentModalRecreacion() {
    const modal = await this.modalController.create({
      component: RecreacionComponent,
      canDismiss: true,
    });
    return await modal.present();
  }

}
