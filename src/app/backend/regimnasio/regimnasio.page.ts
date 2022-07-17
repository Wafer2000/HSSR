import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-regimnasio',
  templateUrl: './regimnasio.page.html',
  styleUrls: ['./regimnasio.page.scss'],
})
export class RegimnasioPage implements OnInit {

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

