import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmovperPageRoutingModule } from './addmovper-routing.module';

import { AddmovperPage } from './addmovper.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmovperPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddmovperPage]
})
export class AddmovperPageModule {}
