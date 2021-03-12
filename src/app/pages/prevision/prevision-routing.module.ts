import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrevisionPage } from './prevision.page';

const routes: Routes = [
  {
    path: '',
    component: PrevisionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrevisionPageRoutingModule {}
