import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Horarios } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  dateValue = '';

  horarios: Horarios[] = [];
  enableNuevo = false;

  nuevo: Horarios;

  private path = 'Horarios';

  constructor(
    public menucontroller: MenuController,
    public firestoreService: FirestoreService,
    private interaction: InteractionService,
    public alertController: AlertController
) { }

  formatDate(value: string) {
    return format(parseISO(value), 'hh:mm aa');
  }

  ngOnInit() {
    this.getHorariosDesc();
  }

  createHorario(){
    if(this.nuevo.hinicial === null){
      this.interaction.presentToast('Digite la hora del inicio');
    }else if(this.nuevo.hfinal === null){
      this.interaction.presentToast('Digite la hora del final');
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

  getHorariosDesc(){
    this.nueva();
    const clase = 'Piscina';
    this.firestoreService.getCollectionUnicDesc<Horarios>(this.path, 'tipo', clase).subscribe(res => {
      this.horarios = res;
      console.log(res);
    });
  }

  deleteHorario(nuevos: Horarios){
    this.interaction.presentLoading('Borrando Noticia...');
    this.firestoreService.deleteDoc(this.path, nuevos.id).then(res=>{
      this.interaction.closeLoading();
      this.interaction.presentToast('Borrada con exito');
    });
  }

  nueva(){
    this.enableNuevo = false;
    this.nuevo = {
      tiempo: new Date(),
      id: this.firestoreService.getId(),
      hinicial: null,
      hfinal: null,
      tipo: 'Piscina'
    };
  }
}
