import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { iregister } from 'src/app/pojos/iregister';
import { RegisterService } from './services/register.services';
import {ShowpasswordComponent} from '../../shared/showpassword/showpassword.component'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public alertController:AlertController,public fb: FormBuilder, public registerSerive: RegisterService, public router:Router) { }

  formulario: FormGroup;



  registro:iregister;

  public registrarse(){
    this.registro = this.formulario.value;
    Object.values(this.formulario.controls).forEach(control => { control.markAsTouched()});
    if(this.formulario.invalid){
      this.registronovalido();
    }
    else{
      this.registerSerive.NuevoRegistro(this.registro);
      this.formulario.reset();
      this.router.navigateByUrl('/login')
    }
  }

  registronovalido(){
    this.alertController.create({
      header: 'ERROR',  
      message: 'Hay errores en el formulario.',  
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  crearFormulario(){
    this.formulario = this.fb.group({
      correo_log: (['', Validators.required ]),
      pwd_log:  (['', [Validators.required, Validators.minLength(6)]]),
      nombre_log: (['', Validators.required]),
      apellidos_log: (['', Validators.required ]),
      nacimiento_log: (['', Validators.required ])
    });
  }

  ngOnInit() {
    this.crearFormulario();
  }

  get nombreNoValido(){
    return this.formulario.get('nombre_log').invalid && this.formulario.get('nombre_log').touched;
  }
  get usrNoValido(){
    return this.formulario.get('correo_log').invalid && this.formulario.get('correo_log').touched;
  }
  get pwdNoValida(){
    return this.formulario.get('pwd_log').invalid && this.formulario.get('pwd_log').touched;
  }
  get apellidosNoValido(){
    return this.formulario.get('apellidos_log').invalid && this.formulario.get('apellidos_log').touched;
  }
  get nacimientoNoValida(){
    return this.formulario.get('nacimiento_log').invalid && this.formulario.get('nacimiento_log').touched;
  }

}
