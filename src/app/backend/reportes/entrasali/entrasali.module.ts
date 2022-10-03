import { PrincipalComponent } from './invitados/principal/principal.component';
import { InvitadosComponent } from './invitados/invitados.component';
import { EnprincipalComponent } from './residentes/enprincipal/enprincipal.component';
import { RecreacionComponent } from './residentes/servicios/recreacion/recreacion.component';
import { PiscinaComponent } from './residentes/servicios/piscina/piscina.component';
import { GimnasioComponent } from './residentes/servicios/gimnasio/gimnasio.component';
import { ParqueaderoComponent } from './residentes/parqueadero/parqueadero.component';
import { ServiciosComponent } from './residentes/servicios/servicios.component';
import { ResidentesComponent } from './residentes/residentes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrasaliPageRoutingModule } from './entrasali-routing.module';

import { EntrasaliPage } from './entrasali.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    EntrasaliPageRoutingModule
  ],
  declarations: [
    EntrasaliPage, 
    ResidentesComponent, 
    ServiciosComponent, 
    ParqueaderoComponent,
    GimnasioComponent,
    PiscinaComponent,
    RecreacionComponent,
    ParqueaderoComponent,
    EnprincipalComponent,
    InvitadosComponent,
    PrincipalComponent
  ]
})
export class EntrasaliPageModule {}
