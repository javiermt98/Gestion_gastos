import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrevisionPageRoutingModule } from './prevision-routing.module';

import { PrevisionPage } from './prevision.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrevisionPageRoutingModule
  ],
  declarations: [PrevisionPage]
})
export class PrevisionPageModule {}
