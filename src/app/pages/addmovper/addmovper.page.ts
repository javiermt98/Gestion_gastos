import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { categoriavacia, icategoria } from 'src/app/pojos/icategorias';
import { icuenta } from 'src/app/pojos/icuenta';
import { imovper, movperVacio } from 'src/app/pojos/imovper';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';
import { CategoriasService } from '../addcategoria/services/categoria.service';
import { MovPerService } from './services/movper.service';

@Component({
  selector: 'app-addmovper',
  templateUrl: './addmovper.page.html',
  styleUrls: ['./addmovper.page.scss'],
})
export class AddmovperPage implements OnInit {

  public cuenta:icuenta;
  public movimiento:imovper = movperVacio();
  categorias:icategoria[];
  public categoria:icategoria = categoriavacia();
  public colorbtn:string = "success";
  formulario: FormGroup;

  public cambiocolorbtn(){
    if(this.tipo_mov == "Gasto"){
      this.colorbtn = "danger"
    }
    else{
      this.colorbtn = "success"
    }
  }

  constructor(public alertController:AlertController, 
    public fb: FormBuilder, 
    public movimientoService: MovPerService, 
    public categoriasService:CategoriasService,
    public router:Router,
    public session:GestionarSesionService) { 

      this.cuenta = this.session.getCuenta();

      this.categoriasService.getCategorias().subscribe({
        next: categorias =>{
          this.categorias = [];
          categorias.forEach(categoria => {
            if(categoria.id_cue == this.cuenta.id_cue){
            this.categorias.push(categoria)
            }
          })
        }
      });
  
  }

  public backbtn(){
    this.router.navigateByUrl("/movper")
  }

  seleccion_mov:string[] = ["Ingreso", "Gasto"];
  tipo_mov:string="Ingreso";

  today = new Date().toISOString();

  public addmovimiento(){
    Object.values(this.formulario.controls).forEach(control => { control.markAsTouched()});
    if(this.formulario.invalid){
      console.log(this.formulario.value);
      this.movimientonovalido();
    }
    else{
      
      if(this.tipo_mov == "Ingreso"){
        this.movimiento = this.formulario.value;
        this.movimiento.tipo_movper = 1;
        this.movimientoService.NuevoMovimiento(this.movimiento);
        this.movimientoregistrado();
      }
      else{
        this.movimiento = this.formulario.value;
        this.movimiento.tipo_movper = 0;
        this.movimientoService.NuevoMovimiento(this.movimiento);
        this.movimientoregistrado();
      }

    }

  }

  ngOnInit() {
    this.crearFormularioMovPer();
  }



  crearFormularioMovPer(){
    this.formulario = this.fb.group({
      periodicidad: (['', [Validators.required, Validators.min(1)]]),
      fecha_movper: (['', Validators.required]),
      cantidad_movper:  (['', [Validators.required, Validators.min(0)]]),
      id_cat: (['', Validators.required]),
      descripcion_movper: (['', Validators.required ]),
      
    });
  }

  movimientoregistrado(){
    this.alertController.create({
      header: 'REGISTRADO',  
      message: 'Movimiento registrado con éxito.',  
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  movimientonovalido(){
    this.alertController.create({
      header: 'ERROR',  
      message: 'Hay datos mal introducidos. Comprueba los campos en rojo y vuelve a intenarlo.',  
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }


  fechaseleccionada=new Date().toISOString();

  get cantidadNoValida(){
    return this.formulario.get('cantidad_movper').invalid && this.formulario.get('cantidad_movper').touched;
  }
  get periodicidadNoValida(){
    return this.formulario.get('periodicidad').invalid && this.formulario.get('periodicidad').touched;
  }
  get fecha_movperNoValida(){
    return this.formulario.get('fecha_movper').invalid && this.formulario.get('fecha_movper').touched;
  }
  get categoriaNoValida(){
    return this.formulario.get('id_cat').invalid && this.formulario.get('id_cat').touched;
  }
  


}
