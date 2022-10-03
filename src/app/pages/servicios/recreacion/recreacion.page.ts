import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Modelo } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-recreacion',
  templateUrl: './recreacion.page.html',
  styleUrls: ['./recreacion.page.scss'],
})
export class RecreacionPage implements OnInit {

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
    const clase = 'Recreacion';
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
