import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  constructor(public router:Router) { }

  periodo:string[] = ["Semana", "Mes", "Año", "Total"];
  tiempo:string="Total";

  public backbtn(){
    this.router.navigateByUrl("/addmovimiento")
  }

  ngOnInit() {
  }

}
