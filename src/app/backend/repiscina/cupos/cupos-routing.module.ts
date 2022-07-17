import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuposPage } from './cupos.page';

const routes: Routes = [
  {
    path: '',
    component: CuposPage
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuposPageRoutingModule {}
