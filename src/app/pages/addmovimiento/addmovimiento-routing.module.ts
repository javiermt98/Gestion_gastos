import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmovimientoPage } from './addmovimiento.page';

const routes: Routes = [
  {
    path: '',
    component: AddmovimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmovimientoPageRoutingModule {}
