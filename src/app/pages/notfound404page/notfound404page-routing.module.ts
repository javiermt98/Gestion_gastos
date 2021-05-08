import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Notfound404pagePage } from './notfound404page.page';

const routes: Routes = [
  {
    path: '',
    component: Notfound404pagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Notfound404pagePageRoutingModule {}
