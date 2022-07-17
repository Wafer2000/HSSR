import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RegistroSResi } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registro: RegistroSResi[] = [];

  constructor(
    public firestoreService: FirestoreService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  this.getRegistro();
  }

  getRegistro(){
  const path = 'RegistroS';
  const services = 'Recreacion';
  this.firestoreService.getCollectionUnicDesc<RegistroSResi>(path, 'services', services).subscribe( res => {
  this.registro = res;
  });
  }

}
