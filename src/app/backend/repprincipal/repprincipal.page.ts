import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-repprincipal',
  templateUrl: './repprincipal.page.html',
  styleUrls: ['./repprincipal.page.scss'],
})
export class RepprincipalPage implements OnInit {

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
