import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcategoriaPage } from './addcategoria.page';

const routes: Routes = [
  {
    path: '',
    component: AddcategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcategoriaPageRoutingModule {}
