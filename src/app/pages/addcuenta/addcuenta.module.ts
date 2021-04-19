import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcuentaPageRoutingModule } from './addcuenta-routing.module';

import { AddcuentaPage } from './addcuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcuentaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddcuentaPage]
})
export class AddcuentaPageModule {}
