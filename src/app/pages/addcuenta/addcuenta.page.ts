import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { cuentaVacia, icuenta } from 'src/app/pojos/icuenta';

@Component({
  selector: 'app-addcuenta',
  templateUrl: './addcuenta.page.html',
  styleUrls: ['./addcuenta.page.scss'],
})
export class AddcuentaPage implements OnInit {

  constructor( public alertController:AlertController,public fb: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }

  public cuenta:icuenta = cuentaVacia();


  formulario: FormGroup;

  cuentacreada(){
    this.alertController.create({
      header: 'CREADA',  
      message: 'Cuenta '+this.cuenta.num_cue+' de '+this.cuenta.propietario+' creada con éxito.',  
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  //Boton del formulario
public addcuenta(){
  console.log(this.formulario);

  //Marca todos los botones como "tocados"
  Object.values(this.formulario.controls).forEach(control => { control.markAsTouched()});
  if(!this.formulario.invalid){
    this.cuentacreada();
    this.cuenta = this.formulario.value;
    console.log(this.cuenta);
    

  }
}

crearFormulario(){
  this.formulario = this.fb.group({
    num_cue: (['', Validators.required ]),
    propietario:  (['', Validators.required]),
    nombre_cue:  (['']),
    saldo_cue:  (['', Validators.required])
  });
}


//Validar informacion
get numNoValido(){
  return this.formulario.get('num_cue').invalid && this.formulario.get('num_cue').touched;
}
get propietarioNoValido(){
  return this.formulario.get('num_cue').invalid && this.formulario.get('num_cue').touched;
}
get saldoNoValido(){
  return this.formulario.get('saldo_cue').invalid && this.formulario.get('saldo_cue').touched;
}

}

