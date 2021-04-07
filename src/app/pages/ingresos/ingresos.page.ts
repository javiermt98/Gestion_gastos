import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.page.html',
  styleUrls: ['./ingresos.page.scss'],
})
export class IngresosPage implements OnInit {

  constructor() { }

  periodo:string[] = ["Semana", "Mes", "Año", "Total"];
  tiempo:string="Total";

  ngOnInit() {
  }

}
