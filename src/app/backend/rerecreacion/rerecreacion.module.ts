import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RerecreacionPageRoutingModule } from './rerecreacion-routing.module';

import { RerecreacionPage } from './rerecreacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RerecreacionPageRoutingModule
  ],
  declarations: [RerecreacionPage]
})
export class RerecreacionPageModule {}
