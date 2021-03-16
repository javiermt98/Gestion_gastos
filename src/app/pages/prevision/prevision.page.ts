import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prevision',
  templateUrl: './prevision.page.html',
  styleUrls: ['./prevision.page.scss'],
})
export class PrevisionPage implements OnInit {

  constructor() { }

  tiempo:string[] = [
    "Semanal","Mensual","Anual"
  ];

  periodo:string="Mensual";
    

  ngOnInit() {
  }

}
