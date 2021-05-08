import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.page.html',
  styleUrls: ['./ingresos.page.scss'],
})
export class IngresosPage implements OnInit {

  constructor(public router: Router) { }

  periodo:string[] = ["Semana", "Mes", "Año", "Total"];
  tiempo:string="Total";

  public backbtn(){
    this.router.navigateByUrl("/addmovimiento")
  }

  ngOnInit() {
  }

}
