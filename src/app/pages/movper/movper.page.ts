import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { icategoria } from 'src/app/pojos/icategorias';
import { imovimiento, movimientoVacio } from 'src/app/pojos/imovimiento';
import { imovper } from 'src/app/pojos/imovper';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';
import { CategoriasService } from '../addcategoria/services/categoria.service';
import { MovimientosService } from '../addmovimiento/services/movimiento.service';
import { MovPerService } from '../addmovper/services/movper.service';

@Component({
  selector: 'app-movper',
  templateUrl: './movper.page.html',
  styleUrls: ['./movper.page.scss'],
})
export class MovperPage implements OnInit {

  public movimientosperiodicos:imovper[] = [];
  public categorias:icategoria[] = [];

  constructor(public router:Router, public movperservice: MovPerService, public categoriasService: CategoriasService, public session:GestionarSesionService, 
    public movimientosService: MovimientosService ) { 

    this.movperservice.getMovimientos().subscribe({
      next: movpers =>{
        this.movimientosperiodicos = movpers;
        movpers.forEach( movimiento =>{
          var date = new Date(movimiento.fecha_movper);
          if(new Date(date.setDate(date.getDate()+movimiento.periodicidad))==new Date()){
            this.movpertomovimiento(movimiento, date);
          }
        });
        }
      
    });

    this.categoriasService.getCategorias().subscribe({
      next: categorias =>{
        this.categorias = [];
        categorias.forEach(categoria => {
          categoria.total_cat = 0;
          if(categoria.id_cue == this.session.getCuenta().id_cue){
            this.movimientosperiodicos.forEach(movper => {
              if(movper.id_cat == categoria.id_cat){
                categoria.total_cat = movper.cantidad_movper + categoria.total_cat;
                if(this.categorias.indexOf(categoria) == -1) //Comprobar que la categoría no esté ya en la lista
                {
                  this.categorias.push(categoria);
                }
                
              }
            })
          
          }
        })
      }
    });
  }

    
  
  public agregarmovper(){
    this.router.navigateByUrl("/addmovper")
  }

  // añade un movimiento cuando la fecha actual sea la fecha de mov + periodicidad
  public movpertomovimiento(movimiento:imovper, date:Date){
      var mov:imovimiento = movimientoVacio();
      mov.cantidad_mov = movimiento.cantidad_movper;
      mov.descripcion_mov = movimiento.descripcion_movper;
      mov.fecha_mov = new Date(movimiento.fecha_movper).toISOString();
      mov.id_cat = movimiento.id_cat;
      mov.tipo_mov = movimiento.tipo_movper;
      this.movimientosService.NuevoMovimiento(mov);
      
      movimiento.fecha_movper = new Date(date.setDate(date.getDate()+movimiento.periodicidad)).toISOString();
      this.movperservice.UpdateMovimiento(movimiento);
  }
    

  public borrarmovper(id_movper:number){
    this.movperservice.EliminaMovimiento(id_movper);
  }

  ngOnInit() {
        // Recarga la página una vez
        if (!localStorage.getItem('reload')) { 
          localStorage.setItem('reload', 'no reload') 
          location.reload() 
        } else {
          localStorage.removeItem('reload') 
        }
      
  }

}
