import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-reparqueadero',
  templateUrl: './reparqueadero.page.html',
  styleUrls: ['./reparqueadero.page.scss'],
})
export class ReparqueaderoPage implements OnInit {

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
