import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public router: Router, public alertController:AlertController, private session:GestionarSesionService) { }

  ngOnInit() {
  }

  async logout(){
    
    const alert = await this.alertController.create({
      header: ' CERRAR',
      message: '¿Estás seguro de que quieres cerrar la sesión actual?',
      buttons: [
        {
          text: 'Permanecer aquí',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.session.LogOut();
            this.router.navigateByUrl("/login");
        
            
          }
        }
      ]
    });
    
    await alert.present();
}




}
