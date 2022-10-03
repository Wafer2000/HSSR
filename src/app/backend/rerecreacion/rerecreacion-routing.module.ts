import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RerecreacionPage } from './rerecreacion.page';

const routes: Routes = [
  {
    path: '',
    component: RerecreacionPage,
    children:[
      {path: 'scanner',
      loadChildren: () => import('./scanner/scanner.module')
      .then( m => m.ScannerPageModule)},
      {path: 'registro',
      loadChildren: () => import('./registro/registro.module')
      .then( m => m.RegistroPageModule)},
      {path: 'cupos',
      loadChildren: () => import('./cupos/cupos.module')
      .then( m => m.CuposPageModule)},
      {path: 'horarios',
      loadChildren: () => import('./horarios/horarios.module')
      .then( m => m.HorariosPageModule)}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RerecreacionPageRoutingModule {}
