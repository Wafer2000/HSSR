import { Component, OnInit } from '@angular/core';
import { RegistroN, RePagos } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.page.html',
  styleUrls: ['./alertas.page.scss'],
})
export class AlertasPage implements OnInit {

  notification: RegistroN[]=[];

  constructor(
    public firestoreService: FirestoreService,
  ) { }

  ngOnInit() {
    this.Registro()
  }

  Registro(){
    const path = 'RegistroN';
    this.firestoreService.getCollectionTodos<RegistroN>(path).subscribe(res=>{
      console.log(res);
      this.notification = res;
    })
  }

}
