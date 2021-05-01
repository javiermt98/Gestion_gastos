import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/authservice';
import {RegisterService} from '../register/services/register.services'
import {LoginService} from './services/login.services'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  constructor(public alertController:AlertController,public fb: FormBuilder, public loginService: LoginService, public authservice: AuthService) { }

  formulario: FormGroup;
  usr:string;
  pwd:string;

  registronovalido(){
    this.alertController.create({
      header: 'ERROR',  
      message: 'El usuario o la contraseña no son válidos. Vuelve a intentarlo o restablece la contraseña.',  
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }
  

    ngOnInit() {
      this.crearFormulario();
  }

  public login(){
    this.usr = this.formulario.get('usr').value;
    this.pwd = this.formulario.get('pwd').value;
    const user = {correo_log: this.usr, pwd_log: this.pwd};
    Object.values(this.formulario.controls).forEach(control => { control.markAsTouched()});
    if(this.formulario.invalid){
      
    }
    else{
      this.authservice.login(user).subscribe( res => console.log('Login'));
      /*this.loginService.login(user).subscribe(data => {
        console.log(data);
      });*/
    }
  }

  crearFormulario(){
    this.formulario = this.fb.group({
      usr: (['', Validators.required ]),
      pwd:  (['', [Validators.required, Validators.minLength(6)]])
    });
  }

  get usrNoValido(){
    return this.formulario.get('usr').invalid && this.formulario.get('usr').touched;
  }
  get pwdNoValida(){
    return this.formulario.get('pwd').invalid && this.formulario.get('pwd').touched;
  }



}
