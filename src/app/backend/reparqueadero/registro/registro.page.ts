import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Registro, RegistroPPrincipalInvi } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registro: RegistroPPrincipalInvi[] = [];
  entradaprincipal: RegistroPPrincipalInvi = {
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
    auto: '',
    dia: null,
    mes: null,
    año: null,
    sem: null,
    qui: null,
    cedula: null,
    tinvitado: ''
  };

  constructor(
              public firestoreService: FirestoreService,
              public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getEntrada();
  }

  getEntrada(){
    const path = 'RegistroPA';
    this.firestoreService.getCollectionTodos<RegistroPPrincipalInvi>(path).subscribe( res => {
      this.registro = res;
    });
  }

}
