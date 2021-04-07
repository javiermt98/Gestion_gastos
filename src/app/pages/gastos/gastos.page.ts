import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  constructor() { }

  periodo:string[] = ["Semana", "Mes", "Año", "Total"];
  tiempo:string="Total";

  ngOnInit() {
  }

}
