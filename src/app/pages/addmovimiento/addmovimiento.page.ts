import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { imovimiento, movimientoVacio } from 'src/app/pojos/imovimiento';
import { MovimientosService } from './services/movimiento.service';

@Component({
  selector: 'app-addmovimiento',
  templateUrl: './addmovimiento.page.html',
  styleUrls: ['./addmovimiento.page.scss'],
})
export class AddmovimientoPage implements OnInit {

  constructor(public alertController:AlertController, public fb: FormBuilder, public movimientoService: MovimientosService) { }

  seleccion_mov:string[] = ["Ingreso", "Gasto", "Movimiento Periódico"];
  tipo_mov:string="Ingreso";

  mostrarMovPer(){
    if(this.tipo_mov=="Movimiento Periódico"){ return true; }
    else{ return false; }
  }

  today = new Date().toISOString();

  public addmovimiento(){
    Object.values(this.formulario.controls).forEach(control => { control.markAsTouched()});
  }

  ngOnInit() {
    this.crearFormulario();
  }

  public movimiento:imovimiento = movimientoVacio();


  formulario: FormGroup;

  crearFormulario(){
    this.formulario = this.fb.group({
      descripcion_mov: (['', Validators.required ]),
      fecha_mov:  (['', Validators.required]),
      cantidad_mov:  (['', [Validators.required, Validators.min(0)]]),
      id_cue:  (['', Validators.required]),
      id_cat: (['', Validators.required]),
      tipo_mov: (['', Validators.required]),
      fecha_movper: (['', Validators.required]),
      periodicidad: (['', Validators.required])
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


  fechaseleccionada=new Date().toISOString();

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

}
