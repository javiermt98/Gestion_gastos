import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Notfound404pagePageRoutingModule } from './notfound404page-routing.module';

import { Notfound404pagePage } from './notfound404page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Notfound404pagePageRoutingModule
  ],
  declarations: [Notfound404pagePage]
})
export class Notfound404pagePageModule {}
