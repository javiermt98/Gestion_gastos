import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movper',
  templateUrl: './movper.page.html',
  styleUrls: ['./movper.page.scss'],
})
export class MovperPage implements OnInit {

  constructor(public router:Router) { }

  periodo:string[] = ["Semana", "Mes", "Año", "Total"];
  tiempo:string="Total";

  public agregarmovper(){
    this.router.navigateByUrl("/addmovper")
  }

  ngOnInit() {
  }

}
