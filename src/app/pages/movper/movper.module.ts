import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovperPageRoutingModule } from './movper-routing.module';

import { MovperPage } from './movper.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovperPageRoutingModule
  ],
  declarations: [MovperPage]
})
export class MovperPageModule {}
