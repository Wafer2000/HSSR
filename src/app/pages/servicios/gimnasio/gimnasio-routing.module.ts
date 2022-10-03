import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GimnasioPage } from './gimnasio.page';

const routes: Routes = [
  {
    path: '',
    component: GimnasioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GimnasioPageRoutingModule {}
