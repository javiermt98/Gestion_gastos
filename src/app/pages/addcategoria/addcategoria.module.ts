import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcategoriaPageRoutingModule } from './addcategoria-routing.module';


import { AddcategoriaPage } from './addcategoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddcategoriaPageRoutingModule
  ],
  declarations: [AddcategoriaPage]
})
export class AddcategoriaPageModule {}
