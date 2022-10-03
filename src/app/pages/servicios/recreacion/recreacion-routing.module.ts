import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecreacionPage } from './recreacion.page';

const routes: Routes = [
  {
    path: '',
    component: RecreacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecreacionPageRoutingModule {}
