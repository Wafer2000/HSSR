import { RecreacionComponent } from './recreacion/recreacion.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GimnasioComponent } from './gimnasio/gimnasio.component';
import { PiscinaComponent } from './piscina/piscina.component';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent implements OnInit {

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
