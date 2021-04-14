import { Component, OnInit } from '@angular/core';
import { icategoria } from 'src/app/pojos/icategorias';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor() { }

  categorias:icategoria[] = [
    {id_cat:0, nombre_cat:"Hogar", max_gasto_cat:123,icono_cat:"home"},
    {id_cat:1, nombre_cat:"Luz", max_gasto_cat:456.22,icono_cat:"sunny"},
    {id_cat:2, nombre_cat:"Agua", max_gasto_cat:12.1,icono_cat:"water"},
    {id_cat:3, nombre_cat:"Ocio", max_gasto_cat:120,icono_cat:"rocket"},
    {id_cat:4, nombre_cat:"Nomina", max_gasto_cat:0 ,icono_cat:"cash"},
    {id_cat:5, nombre_cat:"Comida", max_gasto_cat:350,icono_cat:"fast-food"}

  ];


  ngOnInit() {
  }

}
