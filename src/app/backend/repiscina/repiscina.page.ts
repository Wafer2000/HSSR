import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-repiscina',
  templateUrl: './repiscina.page.html',
  styleUrls: ['./repiscina.page.scss'],
})
export class RepiscinaPage implements OnInit {

  constructor(
    public menucontroller: MenuController,
    ) { }

  ngOnInit() {
  }

  openmenu(){
    console.log('Abrir Menu');
    this.menucontroller.toggle('menu');
  }

}
