import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComparativaPage } from './comparativa.page';

const routes: Routes = [
  {
    path: '',
    component: ComparativaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComparativaPageRoutingModule {}
