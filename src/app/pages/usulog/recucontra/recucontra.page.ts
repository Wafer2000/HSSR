import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-recucontra',
  templateUrl: './recucontra.page.html',
  styleUrls: ['./recucontra.page.scss'],
  providers: [FirebaseauthService]
})
export class RecucontraPage implements OnInit {

  userEmail = new FormControl('');

  constructor(
    private firebaseauthService: FirebaseauthService,
    private interaction: InteractionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.verificar();
  }

  async verificar(){
    const veri = await this.firebaseauthService.getEmailVerified();
    if(veri==false){
      this.router.navigate(['/sendemail']);
      this.interaction.presentToast('Email No Verificado');
    }
  }

  async resetPass(){
    try{
      const email = this.userEmail.value;
      await this.firebaseauthService.resetPassword(email);
      window.alert('A sido enviado el mensaje, debe revisar su bandeja de entrada');
      this.router.navigate(['/usulog']);
    } catch(error){
      console.log(error);
    }
  }

}
