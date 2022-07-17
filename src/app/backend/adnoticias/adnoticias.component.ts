import { AlertController, MenuController} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Noticias } from 'src/app/models/models';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-adnoticias',
  templateUrl: './adnoticias.component.html',
  styleUrls: ['./adnoticias.component.scss'],
})
export class AdnoticiasComponent implements OnInit {

  noticias: Noticias[] = [];

  nuevo: Noticias;

  enableNuevo = false;

  private path = 'Noticias';

  constructor(
              public menucontroller: MenuController,
              public firestoreService: FirestoreService,
              private interaction: InteractionService,
              public alertController: AlertController

  ) {}

  ngOnInit() {
    this.getNoticiasRecientes();
  }

  openmenu(){
    console.log('Abrir Menu');
    this.menucontroller.toggle('menu');
  }

  createNoticia(){
    if(this.nuevo.mensaje === ''){
      this.interaction.presentToast('Digite el mensaje para la Noticia');
    }else{
      this.interaction.presentLoading('Guardando...');
      this.firestoreService.createDoc(this.nuevo, this.path, this.nuevo.id).then(() =>{
        console.log('Guardado con exito ->');
        this.interaction.closeLoading();
        this.interaction.presentToast('Guardado con exito');
      }).catch( error => {
        this.interaction.closeLoading();
        this.interaction.presentToast('A ocurrido un Error');
        console.log('ERROR', error);
      });
      this.nueva();
    };
  }

  getNoticiasRecientes(){
    this.nueva();
    this.firestoreService.getCollectionTodos<Noticias>(this.path).subscribe(res => {
      this.noticias = res;
      console.log(res);
    });
  }

  deleteNoticias(nuevos: Noticias){
    this.interaction.presentLoading('Borrando Noticia...');
    this.firestoreService.deleteDoc(this.path, nuevos.id).then(res=>{
      this.interaction.closeLoading();
      this.interaction.presentToast('Borrada con exito');
    });
  }

  nueva(){
    this.enableNuevo = false;
    this.nuevo = {
      mensaje: '',
      encabezado: '',
      tiempo: new Date(),
      id: this.firestoreService.getId(),
      fecha: new Date().toLocaleDateString('es-GB'),
      hora: new Date().toLocaleTimeString('es-GB')
    };
  }

}
