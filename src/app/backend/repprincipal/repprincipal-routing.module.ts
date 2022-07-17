import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepprincipalPage } from './repprincipal.page';

const routes: Routes = [
  {
    path: '',
    component: RepprincipalPage,
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
export class RepprincipalPageRoutingModule {}
