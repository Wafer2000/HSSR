import { RePagos } from 'src/app/models/models';
import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

  repagos: RePagos[]=[];

  constructor(
    public firestoreService: FirestoreService,
  ) { }

  ngOnInit() {
    this.Registro()
  }

  Registro(){
    const path = 'RePagos';
    this.firestoreService.getCollectionTodos<RePagos>(path).subscribe(res=>{
      console.log(res);
      this.repagos = res;
    })
  }

}
