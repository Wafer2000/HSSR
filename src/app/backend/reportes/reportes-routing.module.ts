import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesPage } from './reportes.page';

const routes: Routes = [
  {
    path: '',
    component: ReportesPage,
    children: [
      {path: 'comparativa', loadChildren: () => import('./comparativa/comparativa.module')
      .then( m => m.ComparativaPageModule)},
      {path: 'entrasali', loadChildren: () => import('./entrasali/entrasali.module')
      .then( m => m.EntrasaliPageModule)},
      {path: 'reservas', loadChildren: () => import('./reservas/reservas.module')
      .then( m => m.ReservasPageModule)},
      {path: 'alertas', loadChildren: () => import('./alertas/alertas.module')
      .then( m => m.AlertasPageModule)},
      {path: 'pagos', loadChildren: () => import('./pagos/pagos.module')
      .then( m => m.PagosPageModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesPageRoutingModule {}
