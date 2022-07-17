import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecucontraPageRoutingModule } from './recucontra-routing.module';

import { RecucontraPage } from './recucontra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RecucontraPageRoutingModule
  ],
  declarations: [RecucontraPage]
})
export class RecucontraPageModule {}
