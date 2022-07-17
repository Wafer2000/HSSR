import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-rerecreacion',
  templateUrl: './rerecreacion.page.html',
  styleUrls: ['./rerecreacion.page.scss'],
})
export class RerecreacionPage implements OnInit {

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
