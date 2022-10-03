import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepiscinaPageRoutingModule } from './repiscina-routing.module';

import { RepiscinaPage } from './repiscina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepiscinaPageRoutingModule
  ],
  declarations: [RepiscinaPage]
})
export class RepiscinaPageModule {}
