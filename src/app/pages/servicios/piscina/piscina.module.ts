import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PiscinaPageRoutingModule } from './piscina-routing.module';

import { PiscinaPage } from './piscina.page';
import { VspiscinaComponent } from 'src/app/components/vspiscina/vspiscina.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PiscinaPageRoutingModule
  ],
  declarations: [PiscinaPage, VspiscinaComponent]
})
export class PiscinaPageModule {}
