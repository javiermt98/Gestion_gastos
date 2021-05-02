import { Component, OnInit } from '@angular/core';
import { icuenta, cuentaVacia } from 'src/app/pojos/icuenta';
import { CuentasService } from 'src/app/pages/addcuenta/services/cuenta.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.page.html',
  styleUrls: ['./mainpage.page.scss'],
})
export class MainpagePage implements OnInit {

  modificando:boolean = false;
  colortexto:string = "";

  public cuentas: icuenta[] = [];
  public cuenta:icuenta = cuentaVacia();

  constructor(public cuentasService: CuentasService, public router:Router, public alertController:AlertController) {
    if (this.router.url!="http://localhost:8100/mainpage"){
      this.modificando = false;
    }

    this.cuentasService.getCuentas().subscribe({
      next: cuentas =>{
        this.cuentas = cuentas;
        this.cuenta = cuentas[0];

      }
    });

   }
  
  ngOnInit() {

    
  }

  async borrarCuenta(){
    const alert = await this.alertController.create({
      header: ' BORRAR',
      message: '¿Estás seguro de que quieres borrar tu cuenta bancaria actual?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Borrar',
          handler: () => {
            if(this.cuentas.length>1){
              this.cuentasService.EliminaCuenta(this.cuenta.id_cue);
            }
            else{
              this.alertController.create({
                header: 'ERROR',  
                message: 'Debes tener al menos una cuenta bancaria registrada.',  
                buttons: ['OK']
              }).then(res => {
                res.present();
              });
        
            }
          }
        }
      ]
    });

    await alert.present();
    
    
    
  }

  

  modificaCuenta(){
    this.modificando = !this.modificando;
    this.cuentasService.UpdateCuenta(this.cuenta);
    this.colortexto = "";
  }

 



  

  


}
