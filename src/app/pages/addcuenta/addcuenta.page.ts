import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CuentasService } from 'src/app/pages/addcuenta/services/cuenta.service';
import { cuentaVacia, icuenta } from 'src/app/pojos/icuenta';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';

@Component({
  selector: 'app-addcuenta',
  templateUrl: './addcuenta.page.html',
  styleUrls: ['./addcuenta.page.scss'],
})
export class AddcuentaPage implements OnInit {

  constructor( public alertController:AlertController, public fb: FormBuilder, public cuentasService: CuentasService, public router:Router, public session: GestionarSesionService) { }

  ngOnInit() {
    this.crearFormulario();
  }

  public backbtn(){
    this.router.navigateByUrl("/mainpage")
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
    this.cuenta = this.formulario.value;
    this.cuenta.id_login =  this.session.getSession().id_login
    this.cuentacreada();
    this.cuentasService.NuevaCuenta(this.cuenta);
    this.router.navigateByUrl("/mainpage");
    
  }
  else{
    this.errordatos();
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

errordatos(){
  this.alertController.create({
    header: 'ERROR',  
    message: 'Hay datos mal introducidos. Comprueba los campos en rojo y vuelve a intenarlo.',  
    buttons: ['OK']
  }).then(res => {
    res.present();
  });
}


//Validar informacion
get numNoValido(){
  return this.formulario.get('num_cue').invalid && this.formulario.get('num_cue').touched;
}
get propietarioNoValido(){
  return this.formulario.get('propietario').invalid && this.formulario.get('propietario').touched;
}
get saldoNoValido(){
  return this.formulario.get('saldo_cue').invalid && this.formulario.get('saldo_cue').touched;
}

}

