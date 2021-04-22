import { Component, OnInit } from '@angular/core';
import { icuenta, cuentaVacia } from 'src/app/pojos/icuenta';
import { CuentasService } from 'src/app/pages/addcuenta/services/cuenta.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.page.html',
  styleUrls: ['./mainpage.page.scss'],
})
export class MainpagePage implements OnInit {

  public cuentas: icuenta[] = [];
  public cuenta:icuenta = cuentaVacia();

  constructor(public cuentasService: CuentasService) {
    
   }
  
  ngOnInit() {
    this.cuentasService.getCuentas().subscribe({
      next: cuentas =>{
        this.cuentas = cuentas;
      }
    });

  }



  

  


}
