import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { MenuController, AlertController } from '@ionic/angular';
import { Invitados } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-invitados',
  templateUrl: './invitados.component.html',
  styleUrls: ['./invitados.component.scss'],
})
export class InvitadosComponent implements OnInit {

  code: any;

  datoscaneado: {};

  enableNuevo = false;

  invitados: Invitados[] = [];

  nuevo: Invitados = {
    id: '',
    estado: null,
    tiempo: new Date(),
    fecha: '',
    hora: '',
    rnombres: '',
    rapellidos: '',
    inombres: '',
    iapellidos: '',
    finvitado: false,
    residente: '',
    cedula: null,
    tipo: ''
  };

  constructor(
    private barcodeScanner: BarcodeScanner,
    public menucontroller: MenuController,
    public firestoreService: FirestoreService,
    public firebaseauthService: FirebaseauthService,
    public alertController: AlertController,
    public firestorageService: FirestorageService,
    private interaction: InteractionService,
  ) {}

  ngOnInit() {
    this.getInvitado();
  }

  openmenu(){
    console.log('Abrir Menu');
    this.menucontroller.toggle('menu');
  }

  async getInvitado(){
    const path = 'Invitados';
    this.firestoreService.getCollection<Invitados>(path).subscribe(res => {
      this.invitados = res;
    });
  }

  CodificarTexto(nuevos: Invitados) {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, nuevos.id).then(
        encodedData => {
          nuevos.id = encodedData;
        },
        err => {
          this.interaction.closeLoading();
          this.interaction.presentToast('Un error ha ocurrido');
          console.log('Un error ha ocurrido: ', err);
        }
    );
  }

}
