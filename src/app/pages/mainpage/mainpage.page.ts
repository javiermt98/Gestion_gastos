import { Component, OnInit } from '@angular/core';
import { icuenta } from 'src/app/services/icuenta';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.page.html',
  styleUrls: ['./mainpage.page.scss'],
})
export class MainpagePage implements OnInit {
  

  constructor() {
    
   }
  
  ngOnInit() {
  }

  public cuentas = [
    {num_cue:123,  propietario:"Javier",  nombre_cue:"Cuenta Principal",  saldo_cue:10000},
    {num_cue:456,  propietario:"Angel",  nombre_cue:"Cuenta Gastos Menores",  saldo_cue:200000},
    {num_cue:789,  propietario:"Sergio",  nombre_cue:"Cuenta BBVA",  saldo_cue:1000}
  ];

  public cuenta:icuenta = this.cuentas[0];


}
