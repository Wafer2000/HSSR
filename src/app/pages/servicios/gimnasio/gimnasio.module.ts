import { VsgimnasioComponent } from '../../../components/vsgimnasio/vsgimnasio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GimnasioPageRoutingModule } from './gimnasio-routing.module';

import { GimnasioPage } from './gimnasio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GimnasioPageRoutingModule
  ],
  declarations: [GimnasioPage, VsgimnasioComponent]
})
export class GimnasioPageModule {}
