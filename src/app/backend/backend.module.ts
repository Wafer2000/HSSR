import { RespuestasComponent } from './respuestas/respuestas.component';
import { InvitadosComponent } from './invitados/invitados.component';
import { AdpagosComponent } from './adpagos/adpagos.component';
import { AdnoticiasComponent } from './adnoticias/adnoticias.component';
import { ResidentesComponent } from './residentes/residentes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    AdnoticiasComponent,
    ResidentesComponent,
    AdpagosComponent,
    InvitadosComponent,
    RespuestasComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
  ]
})
export class BackendModule { }
