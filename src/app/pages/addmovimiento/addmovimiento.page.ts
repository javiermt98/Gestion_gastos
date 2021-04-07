import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addmovimiento',
  templateUrl: './addmovimiento.page.html',
  styleUrls: ['./addmovimiento.page.scss'],
})
export class AddmovimientoPage implements OnInit {

  constructor() { }

  seleccion_mov:string[] = ["Ingreso", "Gasto", "Movimiento Periódico"];
  tipo_mov:string="Ingreso";

  mostrarMovPer(){
    if(this.tipo_mov=="Movimiento Periódico"){ return true; }
    else{ return false; }
  }

  today = new Date().toISOString();



  ngOnInit() {
  }

  fechaseleccionada=new Date().toISOString();

}
