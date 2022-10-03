import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ModalController } from '@ionic/angular';
import { Compromiso, Modelo } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { RegistroPage } from './registro/registro.page';

@Component({
  selector: 'app-cupos',
  templateUrl: './cupos.page.html',
  styleUrls: ['./cupos.page.scss'],
})
export class CuposPage implements OnInit {

  compromisos: Compromiso[]=[];
  compromiso: Compromiso={
    id: '',
    idcupo: '',
    uid: '',
    hcupo: '',
    hora: '',
    fecha: '',
    tiempo: undefined,
    hinicial: '',
    hfinal: '',
    cant: 0,
    nombres: '',
    apellidos: '',
    resi: null,
    invi: null,
    numcasa: ''
  };

  code: any;

  datoscaneado: {};

  id: '';

  enableNuevo = false;

  actualizar: Modelo[] = [];
  actu: Modelo;

  constructor(
    public modalController: ModalController,
    public menucontroller: MenuController,
    public firestoreService: FirestoreService,
    public firebaseauthService: FirebaseauthService,
    public alertController: AlertController,
    public firestorageService: FirestorageService,
    private interaction: InteractionService,
  ) {}

  ngOnInit() {
    this.getCupos();
    this.getActualizar();
  }

  openmenu(){
    console.log('Abrir Menu');
    this.menucontroller.toggle('menu');
  }

  async getCupos(){
    const path = 'CompromisosRecreacion';
    this.firestoreService.getCollectionTodos<Compromiso>(path).subscribe(res => {
      this.compromisos = res;
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: RegistroPage,
      mode: 'md',
      canDismiss: true,
    });
    return await modal.present();
  }

  getActualizar(){
    const path = 'MoldeHorarios';
    const tipo = 'Recreacion';
    this.firestoreService.getCollectionUnic<Modelo>(path, 'tipo', tipo).subscribe(res =>{
      this.actualizar = res;
      console.log(this.actualizar);
    });
  }

  deleteCupo(compromiso, actualiza){
    let resul = 0;
    if(actualiza.cupo){
      resul = actualiza.cupo;
    };
    const actu = {
      cupo: resul-compromiso.cant
    };
    if(actu.cupo < 0){
      actu.cupo = 0;
    }
    const path = 'MoldeHorarios';
    this.interaction.presentLoading('Eliminando Cupo...');
    this.firestoreService.updateDoc(path, 'Recreacion', actu).then(() =>{
      console.log('Vaciado con exito ->');
      const path1 = 'CompromisosRecreacion';
      this.firestoreService.deleteDoc(path1, compromiso.uid).then(res =>{
        console.log('Se borro->', res);
        const path2 = 'MoldeHorarios/Recreacion/cupo/';
        this.firestoreService.deleteDoc(path2, compromiso.uid).then(res=>{
          console.log('Se elimino',res);
          this.interaction.closeLoading();
          this.interaction.presentToast('Eliminado con exito');
        }).catch(err =>{
          console.log('Ocurrio un error ',err);
          this.interaction.closeLoading();
          this.interaction.presentToast('A ocurrido un Error');
        });
      }).catch( error => {
        this.interaction.closeLoading();
        this.interaction.presentToast('A ocurrido un Error');
        console.log('ERROR', error);
      });
    }).catch( error => {
      this.interaction.closeLoading();
      this.interaction.presentToast('A ocurrido un Error');
      console.log('ERROR', error);
    });
  }

}
