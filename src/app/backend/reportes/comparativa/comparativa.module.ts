import { RecreacionComponent } from './recreacion/recreacion.component';
import { PiscinaComponent } from './piscina/piscina.component';
import { GimnasioComponent } from './gimnasio/gimnasio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComparativaPageRoutingModule } from './comparativa-routing.module';

import { ComparativaPage } from './comparativa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComparativaPageRoutingModule
  ],
  declarations: [
    ComparativaPage,
    GimnasioComponent,
    PiscinaComponent,
    RecreacionComponent
  ]
})
export class ComparativaPageModule {}
