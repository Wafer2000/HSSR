import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Pagos, RePagos } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-adpagos',
  templateUrl: './adpagos.component.html',
  styleUrls: ['./adpagos.component.scss'],
})
export class AdpagosComponent implements OnInit {

  pagos: Pagos[] = [];

  nuevo: Pagos = {
    id: '',
    numcomprob: null,
    identifi: null,
    canti: null,
    tiempo: undefined,
    estado: false,
    fecha: '',
    hora: '',
    uid: '',
    nombres: '',
    apellidos: '',
    motiv: '',
    causa: ''
  };

  enableNuevo = true;

  uid = '';

  private path = 'Pagos';

  constructor(
    public menucontroller: MenuController,
    public firestoreService: FirestoreService,
    private interaction: InteractionService,
    public firebaseauthService: FirebaseauthService,
    public alertController: AlertController,

) {}

openmenu(){
    console.log('Abrir Menu');
    this.menucontroller.toggle('menu');
  }

  ngOnInit() {
    this.getPagosRecientes();
  }

  getPagosRecientes(){
    const path = 'Pagos';
    this.firestoreService.getCollectionTodos<Pagos>(path).subscribe(res => {
      this.pagos = res;
      console.log(res);
    });
  }

  async guardarPago(){
    this.interaction.presentLoading('Subiendo Pago...');
    this.firestoreService.createDoc(this.nuevo, this.path, this.nuevo.id).then( res => {
      console.log('Subido con exito', res);
      this.interaction.closeLoading();
      this.interaction.presentToast('Subido con exito');
      if(this.nuevo.estado==false){
        const id = this.firestoreService.getId();
        const path = 'RePagos';
        const data:RePagos = {
          id,
          estado: false,
          causa: this.nuevo.causa,
          residente: this.nuevo.nombres+' '+this.nuevo.apellidos,
          canti: this.nuevo.canti,
          motiv: this.nuevo.motiv,
          numcomprob: this.nuevo.numcomprob,
          fechap: this.nuevo.fecha,
          horap: this.nuevo.hora,
          tiempo: new Date(),
          fecha: new Date().toLocaleDateString('es-GB'),
          hora: new Date().toLocaleTimeString('en-US'),
        }
        this.firestoreService.createDoc(data, path, id).then(res=>{
          console.log(res);
        })
      }else if(this.nuevo.estado==true){
        const id = this.firestoreService.getId();
        const path = 'RePagos';
        const data:RePagos = {
          id,
          estado: true,
          residente: this.nuevo.nombres+' '+this.nuevo.apellidos,
          canti: this.nuevo.canti,
          motiv: this.nuevo.motiv,
          numcomprob: this.nuevo.numcomprob,
          fechap: this.nuevo.fecha,
          horap: this.nuevo.hora,
          tiempo: new Date(),
          fecha: new Date().toLocaleDateString('es-GB'),
          hora: new Date().toLocaleTimeString('en-US'),
        }
        this.firestoreService.createDoc(data, path, id).then(res=>{
          console.log(res);
        })
      }
    }).catch( error => {
      this.interaction.closeLoading();
      this.interaction.presentToast('A ocurrido un Error');
      console.log('ERROR', error);
    });
    this.enableNuevo = false;
  }

}
