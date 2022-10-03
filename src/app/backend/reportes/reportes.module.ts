import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportesPageRoutingModule } from './reportes-routing.module';

import { ReportesPage } from './reportes.page';
import { RouterModule } from '@angular/router';
import { ParqueaderoComponent } from './entrasali/invitados/parqueadero/parqueadero.component';
import { PrincipalComponent } from './entrasali/invitados/principal/principal.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReportesPageRoutingModule
  ],
  declarations: [
    ReportesPage,
    ParqueaderoComponent
  ]
})
export class ReportesPageModule {}
