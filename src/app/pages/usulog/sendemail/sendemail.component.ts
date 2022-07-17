import { InteractionService } from './../../../services/interaction.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseauthService } from './../../../services/firebaseauth.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sendemail',
  templateUrl: './sendemail.component.html',
  styleUrls: ['./sendemail.component.scss'],
  providers: [FirebaseauthService]
})
export class SendemailComponent implements OnInit {
  public user$: Observable<any> = this.firebaseauthService.auth.user;

  constructor(
    public firebaseauthService: FirebaseauthService,
    private router: Router,
    private interaction: InteractionService
    ) {
  }

  ngOnInit() {
    this.verificar();
  }

  sendEmail(): void{
    this.firebaseauthService.veriEmail();
    this.interaction.presentToast('Email Enviado');
  }

  async verificar(){
    const veri = await this.firebaseauthService.getEmailVerified();
    if(veri==true){
      this.router.navigate(['/noticias']);
      this.interaction.presentToast('Email Verificado');
    } else if(veri==false){
      this.interaction.presentToast('Email No Verificado');
    }
    this.sendEmail();
  }

}
