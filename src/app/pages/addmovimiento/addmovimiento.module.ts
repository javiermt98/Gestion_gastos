import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmovimientoPageRoutingModule } from './addmovimiento-routing.module';

import { AddmovimientoPage } from './addmovimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmovimientoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddmovimientoPage]
})
export class AddmovimientoPageModule {}
