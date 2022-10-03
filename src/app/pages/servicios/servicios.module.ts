import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ServiciosPageRoutingModule } from './servicios-routing.module';
import { ServiciosPage } from './servicios.page';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ServiciosPageRoutingModule
  ],
  declarations: [ServiciosPage]
})
export class ServiciosPageModule { }
