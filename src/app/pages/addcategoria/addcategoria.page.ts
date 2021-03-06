import { Component, OnInit } from '@angular/core';
import { icategoria, categoriavacia } from 'src/app/pojos/icategorias';
import {DaoCategoriasService} from 'src/app/dao/dao_categorias_service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CategoriasService } from './services/categoria.service';
import { Router } from '@angular/router';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';
import { icuenta } from 'src/app/pojos/icuenta';

@Component({
  selector: 'app-addcategoria',
  templateUrl: './addcategoria.page.html',
  styleUrls: ['./addcategoria.page.scss'],
})


export class AddcategoriaPage implements OnInit {

botones_menu:string[]=["barbell" ,"boat" ,"diamond","film" ,"cog" ,"water" ,"hammer" ,"laptop" ,"car-sport" ,"cart" ,"dice" ,"bulb" ,"cash" ,"fast-food" ,"flash" ,"game-controller" ,"gift" ,"home" ,"paw" ,"phone-portrait" ,"shirt" ,"storefront" ,"tennisball" ,"wifi" ,"help-circle"];

formulario: FormGroup;
categorias:icategoria[];
iconosel:string = "help-circle-outline";
cuenta:icuenta;


public categoria:icategoria = categoriavacia();

constructor(public alertController:AlertController, 
  public  categoriasService: CategoriasService, 
  public daocategoriasservide: DaoCategoriasService, 
  public fb: FormBuilder,
  public router:Router,
  public session:GestionarSesionService) {
    this.cuenta = this.session.getCuenta();
  this.categoriasService.getCategorias().subscribe({
    next: categorias =>{
      this.categorias = [];
      categorias.forEach(categoria => {
        
       if(categoria.id_cue = this.cuenta.id_cue){
        console.log(categoria)
         this.categorias.push(categoria);
       }
      })
    }
  });
}

public backbtn(){
  this.router.navigateByUrl("/categorias")
}

ngOnInit() {
    this.crearFormulario();

}

//Boton del formulario
public addcategoria(){

  //Marca todos los botones como "tocados"
  Object.values(this.formulario.controls).forEach(control => { control.markAsTouched()});
  if(!this.formulario.invalid){

    this.categoriacreada();
    this.cuenta = this.session.getCuenta();
    this.categoria = this.formulario.value;
    this.categoria.id_cue = this.cuenta.id_cue;
    console.log(this.categoria);
    this.categoriasService.NuevaCategoria(this.categoria);

  }
}

//Alerta que salta cuando creas una categoria
categoriacreada(){
  this.alertController.create({
    header: 'CREADA',  
    message: 'Categor??a '+this.categoria.nombre_cat+' creada con ??xito.',  
    buttons: ['OK']
  }).then(res => {
    res.present();
  });
}

//Cambiar el texto del icono al hacer click en ??l
public iconoseleccionado(icono:string){
  this.iconosel = icono;
  this.formulario.get('icono_cat').setValue(icono+'-outline');
}



crearFormulario(){
  this.formulario = this.fb.group({
    nombre_cat: (['', Validators.required ]),
    icono_cat:  (['help-circle-outline', Validators.required]),
    max_gasto_cat:  (['', Validators.min(0)]),
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

get maxgastoNoValido(){
  return this.formulario.get('max_gasto_cat').invalid && this.formulario.get('max_gasto_cat').touched;
}






}
