import { PerfilComponent } from './perfil/perfil.component';
import { PreguntasComponent } from './preguntas/preguntas.component';

import { TusinvitadosComponent } from './tusinvitados/tusinvitados.component';
import { CompromisosComponent } from './compromisos/compromisos.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { PagosComponent } from './pagos/pagos.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsulogComponent } from './usulog/usulog.component';
import { SendemailComponent } from './usulog/sendemail/sendemail.component';



@NgModule({
  declarations: [
    UsulogComponent,
    PagosComponent,
    NoticiasComponent,
    CompromisosComponent,
    TusinvitadosComponent,
    SendemailComponent,
    PreguntasComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
  ]
})
export class PagesModule { }
