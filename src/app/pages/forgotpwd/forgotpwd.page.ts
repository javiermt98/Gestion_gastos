import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { iregister } from 'src/app/pojos/iregister';
import { RegisterService } from '../register/services/register.services';
import nodemailer from 'nodemailer';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.page.html',
  styleUrls: ['./forgotpwd.page.scss'],
})
export class ForgotpwdPage implements OnInit {

  
  email:string;
  registros:iregister[];
  existe:boolean;
  pwd:string;

  constructor(public registerService: RegisterService, public alertController:AlertController) { 
    this.registerService.getRegistros().subscribe({next:registro => {
      this.registros = registro;
    }});

  }

  ngOnInit() {
  }

  comprobarEmail(){
    this.existe = false;
    console.log(this.email);
    this.registros.forEach(registro => {
      if(registro.correo_log == this.email){
        this.pwd = registro.pwd_log;
        this.existe = true;
      }
    });

    if(this.existe){
      this.mailenviado();
      this.sendemail();
    }
    else{
      this.correonoexiste();
    }

  }

  mailenviado(){
    this.alertController.create({
      header: 'ENVIADO',  
      message: 'Hemos enviado un correo a su email con la nueva contraseña. Compruebe su bandeja de entrada o spam',  
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  correonoexiste(){
    this.alertController.create({
      header: 'ERROR',  
      message: 'El correo no está registrado. Cree un nuevo registro.',  
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  sendemail(){
    
  }


}
