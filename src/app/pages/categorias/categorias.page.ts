import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { icategoria } from 'src/app/pojos/icategorias';
import { CategoriasService } from '../addcategoria/services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  public categorias:icategoria[];

  constructor(public categoriasService: CategoriasService,public router: Router) { }

  public addccategoria(){
    this.router.navigateByUrl("/addcategoria")
  }


  ngOnInit() {
    this.categoriasService.getCategorias().subscribe({
      next: categoria =>{
        this.categorias = categoria;
      }
    });

  }

}
