import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PiscinaPage } from './piscina.page';

const routes: Routes = [
  {
    path: '',
    component: PiscinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PiscinaPageRoutingModule {}
