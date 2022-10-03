import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReparqueaderoPageRoutingModule } from './reparqueadero-routing.module';

import { ReparqueaderoPage } from './reparqueadero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReparqueaderoPageRoutingModule
  ],
  declarations: [ReparqueaderoPage]
})
export class ReparqueaderoPageModule {}
