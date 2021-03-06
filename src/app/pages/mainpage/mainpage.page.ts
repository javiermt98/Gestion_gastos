import { Component, OnInit } from '@angular/core';
import { icuenta, cuentaVacia, CuentasToAJSON } from 'src/app/pojos/icuenta';
import { CuentasService } from 'src/app/pages/addcuenta/services/cuenta.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';
import { Isession } from 'src/app/pojos/isession';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.page.html',
  styleUrls: ['./mainpage.page.scss'],
})
export class MainpagePage implements OnInit {
  
  modificando:boolean = false;
  colortexto:string = "";
  public currentUser:Isession;
  public numcuenta:icuenta;
  public cuentas: icuenta[] = [];
  public cuenta:icuenta = cuentaVacia();


  constructor(public cuentasService: CuentasService, public router:Router, public alertController:AlertController, public session: GestionarSesionService) {

    this.cuentasService.getCuentas().subscribe({
      next: cuentas =>{
        //Vacio el array para que no me duplique las cuentas ya creadas
        this.cuentas = [];
        cuentas.forEach(cuenta => {
          if(cuenta.id_login == this.session.getSession().id_login ){
            this.cuentas.push(cuenta);
            if(this.session.getCuenta() == null){
              this.session.setCuenta(cuenta);
            }
            else if(this.session.getCuenta()!= null && this.session.getCuenta().id_cue == cuenta.id_cue && this.session.getCuenta().saldo_cue != cuenta.saldo_cue){
              this.session.setCuenta(cuenta);
            }
          }
        });

      }
    });

      this.cuenta = this.session.getCuenta();

   }


  
  ngOnInit() {
    if(this.cuenta == null){
      this.cuenta = cuentaVacia();
    } 
    
  }

  actualizacuenta(){
    this.session.setCuenta(this.cuenta);
    console.log(this.cuenta);
    console.log(this.session.getCuenta());
  }

  async borrarCuenta(){
    const alert = await this.alertController.create({
      header: ' BORRAR',
      message: '??Est??s seguro de que quieres borrar tu cuenta bancaria actual?',
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

  public addCuenta(){
    this.router.navigateByUrl("/addcuenta")
  }

 



  

  


}
