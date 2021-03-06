import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {LoginService} from './services/login.services'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  constructor(
    public alertController:AlertController,
    public fb: FormBuilder, 
    public loginService: LoginService, 
    private router: Router,
    ) {


     }

  formulario: FormGroup;
  usr:string;
  pwd:string;
  loading:false;

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
    Object.values(this.formulario.controls).forEach(control => { control.markAsTouched()});
    if(this.formulario.invalid){
      
    }
    else{
      this.loading=false;
      console.log(event);
      event.preventDefault(); // Avoid default action for the submit button of the login form
      
      if (this.loginService.Testlogin(this.usr, this.pwd))  { 

            this.router.navigateByUrl("/mainpage");
            
      } else {
             this.registronovalido();
             this.router.navigateByUrl('/login');
      }
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

  public register(){
    this.router.navigateByUrl("/register")
  }

  public forgotpwd(){
    this.router.navigateByUrl("/forgotpwd")
  }



}
