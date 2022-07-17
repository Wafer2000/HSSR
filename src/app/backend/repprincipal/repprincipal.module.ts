import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepprincipalPageRoutingModule } from './repprincipal-routing.module';

import { RepprincipalPage } from './repprincipal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepprincipalPageRoutingModule
  ],
  declarations: [RepprincipalPage]
})
export class RepprincipalPageModule {}
