import { FirebaseauthService } from './../../../services/firebaseauth.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Modelo } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-gimnasio',
  templateUrl: './gimnasio.page.html',
  styleUrls: ['./gimnasio.page.scss'],
})
export class GimnasioPage implements OnInit {

  modelos: Modelo[] = [];
  modelo: Modelo;

  constructor(
    public modalController: ModalController,
    public firestoreService: FirestoreService,
    public alertController: AlertController,
    public firebaseauthService: FirebaseauthService,
    private interaction: InteractionService,
    public router: Router
    ) { }

  ngOnInit() {
    this.getHorariosDesc();
    this.verificar();
  }

  async verificar(){
    const veri = await this.firebaseauthService.getEmailVerified();
    if(veri==false){
      this.router.navigate(['/sendemail']);
      this.interaction.presentToast('Email No Verificado');
    }
  }

  getHorariosDesc(){
    const clase = 'Gimnasio';
    const path = 'MoldeHorarios';
    this.firestoreService.getCollectionUnic<Modelo>(path, 'tipo', clase).subscribe(res => {
      this.modelos = res;
      console.log(res);
    });
  }

  cerrar(){
    this.modalController.dismiss();
  }
}
