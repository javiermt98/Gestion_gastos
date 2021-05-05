import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { Isession } from 'src/app/pojos/isession';
import { AuthService } from 'src/app/shared/authservice';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';
import {RegisterService} from '../register/services/register.services'
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
    public authservice: AuthService, 
    private router: Router,
    private Session:GestionarSesionService) {


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
            
            let token="kekek";
            let u: Isession = {username: this.usr ,token: token};        
            this.Session.setSession(u);
            this.router.navigateByUrl('/mainpage');
            
      } else {
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



}
