import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegistroCS } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registro: RegistroCS[] = [];

  constructor(
    public modalController: ModalController,
    public firestoreService: FirestoreService,
    ) { }

  ngOnInit() {
    this.getHorariosDesc();
  }

  getHorariosDesc(){
    const clase = 'Recreacion';
    const path = 'RegistroCS';
    this.firestoreService.getCollectionUnicDesc<RegistroCS>(path, 'services', clase).subscribe(res => {
      this.registro = res;
      console.log(res);
    });
  }

  cerrar(){
    this.modalController.dismiss();
  }
}
