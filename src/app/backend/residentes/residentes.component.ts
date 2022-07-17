import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Usuarios } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-residentes',
  templateUrl: './residentes.component.html',
  styleUrls: ['./residentes.component.scss'],
})
export class ResidentesComponent implements OnInit {

  registros: Usuarios[] = [];

  registro: Usuarios = {
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    casa: '',
    fechanacimiento: '',
    foto: '',
    uid: '',
    numidenti: null,
    posi: null
  };

  constructor(
              public menucontroller: MenuController,
              public firestoreService: FirestoreService,
              public alertController: AlertController,

  ) {}

  ngOnInit() {
    this.getUsuarios();
  }

  openmenu(){
    console.log('Abrir Menu');
    this.menucontroller.toggle('menu');
  }

  getUsuarios(){
    const path = 'Usuarios';
    this.firestoreService.getCollection<Usuarios>(path).subscribe( res => {
      this.registros = res;
    });
  }

}
