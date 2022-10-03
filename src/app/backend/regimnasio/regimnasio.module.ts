import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegimnasioPageRoutingModule } from './regimnasio-routing.module';

import { RegimnasioPage } from './regimnasio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegimnasioPageRoutingModule
  ],
  declarations: [RegimnasioPage]
})
export class RegimnasioPageModule {}
