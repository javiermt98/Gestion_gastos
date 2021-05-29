import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { icategoria } from 'src/app/pojos/icategorias';
import { imovimiento } from 'src/app/pojos/imovimiento';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';
import { CategoriasService } from '../addcategoria/services/categoria.service';
import { MovimientosService } from '../addmovimiento/services/movimiento.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.page.html',
  styleUrls: ['./ingresos.page.scss'],
})
export class IngresosPage implements OnInit {
  periodo:string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "Total" ];
  mes:string=this.periodo[new Date().getMonth()];
  public ingresosFiltrados:imovimiento[] = [];
  public ingresos:imovimiento[] = [];
  public categorias:icategoria[] =[];
  



  constructor(public router:Router, 
    public movimientoService: MovimientosService, 
    public categoriasService:CategoriasService, 
    public session:GestionarSesionService ) {

      // Así le doy tiempo a la página para que cargue antes de rellenar los arrays
      setTimeout(() => {
        this.filtrarIngresos();
      }, 100);


     }



  public backbtn(){
    this.router.navigateByUrl("/addmovimiento")
  }

  filtrarIngresos(){
    this.movimientoService.getMovimientos().subscribe({
      next: ingresos =>{
        this.ingresos = [];
        this.ingresosFiltrados = [];
        ingresos.forEach(gasto => {
          if(gasto.tipo_mov == 1){
              this.ingresos.push(gasto);
              if(this.mes == "Total"){
                this.ingresosFiltrados.push(gasto)
              }
              else{
                if(new Date(gasto.fecha_mov).getMonth() == this.periodo.indexOf(this.mes) && new Date(gasto.fecha_mov).getFullYear() == new Date().getFullYear()){
                  this.ingresosFiltrados.push(gasto);
                  
                }
              }
            }
        })
      }
    });

    this.categoriasService.getCategorias().subscribe({
      next: categorias =>{
        this.categorias = [];
        categorias.forEach(categoria => {
          categoria.total_cat = 0;
          if(categoria.id_cue == this.session.getCuenta().id_cue){
            this.ingresosFiltrados.forEach(gasto => {
              if(gasto.tipo_mov == 1 && gasto.id_cat == categoria.id_cat){
                categoria.total_cat = gasto.cantidad_mov + categoria.total_cat;
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

  ngOnInit() {
  }

}
