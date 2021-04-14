import { Component, OnInit } from '@angular/core';
import { icategoria, nuevacategoria } from 'src/app/pojos/icategorias';
import {DaoCategoriasService} from 'src/app/dao/dao_categorias_service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-addcategoria',
  templateUrl: './addcategoria.page.html',
  styleUrls: ['./addcategoria.page.scss'],
})


export class AddcategoriaPage implements OnInit {

  
nombre_cat:string="Categoria";
max_gastos_cat:number=0;
icono_cat:string="help-circle-outline";

//Formulario Reactivo
formulario: FormGroup;

public categoria:icategoria = nuevacategoria();

constructor(public alertController:AlertController, public daocategoriasservide: DaoCategoriasService, public fb: FormBuilder) {
}

ngOnInit() {
    this.crearFormulario();

}

//Boton del formulario
public addcategoria(){
  console.log(this.formulario);

  //Marca todos los botones como "tocados"
  Object.values(this.formulario.controls).forEach(control => { control.markAsTouched()});

  this.categoriacreada();
  

}

//Alerta que salta cuando creas una categoria
categoriacreada(){
  this.alertController.create({
    header: 'CREADA',  
    message: 'Categoría '+this.categoria.nombre_cat+' creada con éxito.',  
    buttons: ['OK']
  }).then(res => {
    res.present();
  });
}



crearFormulario(){
  this.formulario = this.fb.group({
    nombre_cat: (['', Validators.required ]),
    icono_cat:  (['', Validators.required]),
    gasto_limite:  (['', Validators.min(0)]),
    id_cat_padre:  ([''])

    
  });
}

//Validar informacion
get nombreNoValido(){
  return this.formulario.get('nombre_cat').invalid && this.formulario.get('nombre_cat').touched;
}

get iconoNoValido(){
  return this.formulario.get('icono_cat').invalid && this.formulario.get('icono_cat').touched;
}

get gastolimNoValido(){
  return this.formulario.get('gasto_limite').invalid && this.formulario.get('gasto_limite').touched;
}






}
