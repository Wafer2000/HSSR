import { CompromisosComponent } from './pages/compromisos/compromisos.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdnoticiasComponent } from './backend/adnoticias/adnoticias.component';
import { UsulogComponent } from './pages/usulog/usulog.component';
import { canActivate } from '@angular/fire/compat/auth-guard';
import { map } from 'rxjs/operators';
import { ResidentesComponent } from './backend/residentes/residentes.component';
import { AdpagosComponent } from './backend/adpagos/adpagos.component';
import { PagosComponent } from './pages/pagos/pagos.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { TusinvitadosComponent } from './pages/tusinvitados/tusinvitados.component';
import { InvitadosComponent } from './backend/invitados/invitados.component';
import { SendemailComponent } from './pages/usulog/sendemail/sendemail.component';
import { RespuestasComponent } from './backend/respuestas/respuestas.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const uidAdmin = 'Q82Ekgrmn3fOuPa4sNscu0KKeLj1';

const onlyusu = () => map((user: any) => !!user && user.uid !== null);

const onlyAdmin = () => map((user: any) => !!user && user.uid === uidAdmin);

const routes: Routes = [
  {path: 'servicios', loadChildren: () => import('./pages/servicios/servicios.module')
  .then( m => m.ServiciosPageModule), ...canActivate(onlyusu)},
  {path: 'usulog', component: UsulogComponent, ...canActivate(onlyusu)},
  {path: 'perfil', component: PerfilComponent, ...canActivate(onlyusu)},
  {path: 'recucontra', loadChildren: () => import('./pages/usulog/recucontra/recucontra.module')
  .then( m => m.RecucontraPageModule), ...canActivate(onlyusu)},
  {path: 'pagos', component: PagosComponent, ...canActivate(onlyusu)},
  {path: 'sendemail', component: SendemailComponent, ...canActivate(onlyusu)},
  {path: 'compromisos', component: CompromisosComponent, ...canActivate(onlyusu)},
  {path: 'noticias', component: NoticiasComponent, ...canActivate(onlyusu)},
  {path: 'crearinvi', component: TusinvitadosComponent, ...canActivate(onlyusu)},
  {path: 'preguntas', component: PreguntasComponent, ...canActivate(onlyusu)},
  {path: 'adnoticias', component: AdnoticiasComponent, ...canActivate(onlyAdmin)},
  {path: 'adpagos', component: AdpagosComponent, ...canActivate(onlyAdmin)},
  {path: 'residentes', component: ResidentesComponent, ...canActivate(onlyAdmin)},
  {path: 'invitados', component: InvitadosComponent, ...canActivate(onlyAdmin)},
  {path: 'respuestas', component: RespuestasComponent, ...canActivate(onlyAdmin)},
  {path: 'repprincipal', loadChildren: () => import('./backend/repprincipal/repprincipal.module')
  .then( m => m.RepprincipalPageModule), ...canActivate(onlyAdmin)},
  {path: 'regimnasio', loadChildren: () => import('./backend/regimnasio/regimnasio.module')
  .then( m => m.RegimnasioPageModule), ...canActivate(onlyAdmin)},
  {path: 'reparqueadero', loadChildren: () => import('./backend/reparqueadero/reparqueadero.module')
  .then( m => m.ReparqueaderoPageModule), ...canActivate(onlyAdmin)},
  {path: 'repiscina', loadChildren: () => import('./backend/repiscina/repiscina.module')
  .then( m => m.RepiscinaPageModule), ...canActivate(onlyAdmin)},
  {path: 'rerecreacion', loadChildren: () => import('./backend/rerecreacion/rerecreacion.module')
  .then( m => m.RerecreacionPageModule), ...canActivate(onlyAdmin)},
  {path: 'reportes', loadChildren: () => import('./backend/reportes/reportes.module')
  .then( m => m.ReportesPageModule), ...canActivate(onlyAdmin)},
  {path: '', component: UsulogComponent},
  {path: '**', redirectTo: 'usulog', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
