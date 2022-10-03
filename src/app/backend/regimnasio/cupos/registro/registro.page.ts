import { RegistroCS } from 'src/app/models/models';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalController } from '@ionic/angular';

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
    const clase = 'Gimnasio';
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
