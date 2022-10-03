import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Registro } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registro: Registro[] = [];
  entradaprincipal: Registro = {
    id: '',
    uid: '',
    tiempo: new Date(),
    fecha: '',
    hora: '',
    nombres: '',
    apellidos: '',
    finvitado: null,
    tipo: '',
    entrasali: 'Entro' || 'Salio',
    cedula: null,
    numcasa: '',
    dia: null,
    mes: null,
    año: null,
    sem: null,
    wee: null,
    qui: null
  };

  constructor(
              public firestoreService: FirestoreService,
              public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getEntrada();
  }

  getEntrada(){
    const path = 'RegistroPP';
    this.firestoreService.getCollectionTodos<Registro>(path).subscribe( res => {
      this.registro = res;
    });
  }

}
