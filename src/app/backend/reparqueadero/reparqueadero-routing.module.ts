import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReparqueaderoPage } from './reparqueadero.page';

const routes: Routes = [
  {
    path: '',
    component: ReparqueaderoPage,
    children:[
      {path: 'scanner',
      loadChildren: () => import('./scanner/scanner.module')
      .then( m => m.ScannerPageModule)},
      {path: 'registro',
      loadChildren: () => import('./registro/registro.module')
      .then( m => m.RegistroPageModule)}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReparqueaderoPageRoutingModule {}
