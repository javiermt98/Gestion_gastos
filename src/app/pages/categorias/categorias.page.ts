import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { icategoria } from 'src/app/pojos/icategorias';
import { icuenta } from 'src/app/pojos/icuenta';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';
import { CategoriasService } from '../addcategoria/services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  public categorias:icategoria[];
  public cuenta:icuenta;

  constructor(public categoriasService: CategoriasService,public router: Router, public session: GestionarSesionService) {
    this.cuenta = this.session.getCuenta();
    this.categoriasService.getCategorias().subscribe({
      next: categorias =>{
        this.categorias = [];
        categorias.forEach(categoria => {
          if(categoria.id_cue == this.cuenta.id_cue){
          this.categorias.push(categoria)
          }
        })
      }
    });

    console.log(this.session.getCuenta());

   }

  public addccategoria(){
    this.router.navigateByUrl("/addcategoria")
  }


  ngOnInit() {
   

  }

}
