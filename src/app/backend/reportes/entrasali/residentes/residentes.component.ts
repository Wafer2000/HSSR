import { EnprincipalComponent } from './enprincipal/enprincipal.component';
import { ParqueaderoComponent } from './parqueadero/parqueadero.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-residentes',
  templateUrl: './residentes.component.html',
  styleUrls: ['./residentes.component.scss'],
})
export class ResidentesComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    ) { }

  ngOnInit() {}

  cerrar(){
    this.modalController.dismiss();
  }

  async presentModalServicios() {
    const modal = await this.modalController.create({
      component: ServiciosComponent,
      canDismiss: true,
    });
    return await modal.present();
  }

  async presentModalParqueadero() {
    const modal = await this.modalController.create({
      component: ParqueaderoComponent,
      canDismiss: true,
    });
    return await modal.present();
  }

  async presentModalPrincipal() {
    const modal = await this.modalController.create({
      component: EnprincipalComponent,
      canDismiss: true,
    });
    return await modal.present();
  }

}
