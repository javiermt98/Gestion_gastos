import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { icategoria } from 'src/app/pojos/icategorias';
import { icuenta } from 'src/app/pojos/icuenta';
import { imovimiento } from 'src/app/pojos/imovimiento';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';
import { CategoriasService } from '../addcategoria/services/categoria.service';
import { MovimientosService } from '../addmovimiento/services/movimiento.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  public categorias:icategoria[];
  public cuenta:icuenta;
  public borrando:boolean = false;
  public movimientos:imovimiento[];

  constructor(public categoriasService: CategoriasService,public router: Router, public session: GestionarSesionService, public movimientoService: MovimientosService) {
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

    this.movimientoService.getMovimientos().subscribe({
      next: gastos =>{
        this.movimientos = gastos;
      }
    });

    console.log(this.session.getCuenta());

   }

   public borrarcategoria(id_cat:number){
     console.log(id_cat);
     this.movimientos.forEach(movimiento => {
       if(movimiento.id_cat == id_cat){
         this.movimientoService.EliminaMovimiento(movimiento.id_mov);
       }
       
     });
    this.categoriasService.EliminaCategoria(id_cat);
   }

  public addccategoria(){
    this.router.navigateByUrl("/addcategoria")
  }


  ngOnInit() {
   

  }

}
