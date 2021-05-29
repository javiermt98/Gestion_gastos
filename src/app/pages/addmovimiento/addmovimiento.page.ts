import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { categoriavacia, icategoria } from 'src/app/pojos/icategorias';
import { icuenta } from 'src/app/pojos/icuenta';
import { imovimiento, movimientoVacio } from 'src/app/pojos/imovimiento';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';
import { CategoriasService } from '../addcategoria/services/categoria.service';
import { CuentasService } from '../addcuenta/services/cuenta.service';
import { MovimientosService } from './services/movimiento.service';

@Component({
  selector: 'app-addmovimiento',
  templateUrl: './addmovimiento.page.html',
  styleUrls: ['./addmovimiento.page.scss'],
})
export class AddmovimientoPage implements OnInit {

  public cuenta:icuenta;
  public movimiento:imovimiento = movimientoVacio();
  categorias:icategoria[];
  public categoria:icategoria = categoriavacia();
  public colorbtn:string = "success";
  seleccion_mov:string[] = ["Ingresos", "Gastos"];
  tipo_mov:string="Ingresos";

  public cambiocolorbtn(){
    if(this.tipo_mov == "Gastos"){
      this.colorbtn = "danger"
    }
    else{
      this.colorbtn = "success"
    }
  }

  constructor(public alertController:AlertController, 
    public fb: FormBuilder, 
    public movimientoService: MovimientosService, 
    public categoriasService:CategoriasService,
    public router:Router,
    public session:GestionarSesionService,
    public cuentasService: CuentasService) { 

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
    this.router.navigateByUrl("/"+this.tipo_mov.toLowerCase())
  }



  today = new Date().toISOString();

  public addmovimiento(){
    Object.values(this.formulario.controls).forEach(control => { control.markAsTouched()});
    if(this.formulario.invalid){
      console.log(this.formulario.value);
      this.movimientonovalido();
    }
    else{
      
      if(this.tipo_mov == "Ingresos"){
        this.movimiento = this.formulario.value;
        this.movimiento.tipo_mov = 1;
        this.movimientoService.NuevoMovimiento(this.movimiento);
        this.cuenta.saldo_cue = this.cuenta.saldo_cue + this.movimiento.cantidad_mov;
        this.cuentasService.UpdateCuenta(this.cuenta);
        this.session.setCuenta(this.cuenta);
        this.movimientoregistrado();
      }
      else{
        this.movimiento = this.formulario.value;
        this.movimiento.tipo_mov = 0;
        this.movimientoService.NuevoMovimiento(this.movimiento);
        this.cuenta.saldo_cue = this.cuenta.saldo_cue - this.movimiento.cantidad_mov;
        this.cuentasService.UpdateCuenta(this.cuenta);
        this.session.setCuenta(this.cuenta);
        this.movimientoregistrado();
      }

    }

  }

  ngOnInit() {
    this.crearFormularioMov();
  }




  formulario: FormGroup;

  crearFormularioMov(){
    this.formulario = this.fb.group({
      descripcion_mov: (['', Validators.required ]),
      fecha_mov:  (['', Validators.required]),
      cantidad_mov:  (['', [Validators.required, Validators.min(0)]]),
      id_cat: (['', Validators.required]),
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
  get fecha_movNoValida(){
    return this.formulario.get('fecha_mov').invalid && this.formulario.get('fecha_mov').touched;
  }
  get cantidadNoValida(){
    return this.formulario.get('cantidad_mov').invalid && this.formulario.get('cantidad_mov').touched;
  }
  get diasNoValido(){
    return this.formulario.get('cantidad_mov').invalid && this.formulario.get('cantidad_mov').touched;
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
