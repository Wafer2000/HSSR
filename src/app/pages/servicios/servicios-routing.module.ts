import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiciosPage } from './servicios.page';

const routes: Routes = [
  {
    path: '',
    component: ServiciosPage,
    children: [
      {path: 'gimnasio',
      loadChildren: () => import('./gimnasio/gimnasio.module')
      .then( m => m.GimnasioPageModule)},
      {path: 'piscina',
      loadChildren: () => import('./piscina/piscina.module')
      .then( m => m.PiscinaPageModule)},
      {path: 'recreacion',
      loadChildren: () => import('./recreacion/recreacion.module')
      .then( m => m.RecreacionPageModule)}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosPageRoutingModule {}
