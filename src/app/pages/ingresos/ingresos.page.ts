import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { icategoria } from 'src/app/pojos/icategorias';
import { icuenta } from 'src/app/pojos/icuenta';
import { imovimiento } from 'src/app/pojos/imovimiento';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';
import { CategoriasService } from '../addcategoria/services/categoria.service';
import { CuentasService } from '../addcuenta/services/cuenta.service';
import { MovimientosService } from '../addmovimiento/services/movimiento.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.page.html',
  styleUrls: ['./ingresos.page.scss'],
})
export class IngresosPage implements OnInit {
  periodo:string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "Total" ];
  mes:string="Total";
  public ingresosFiltrados:imovimiento[] = [];
  public categorias:icategoria[] =[];
  borrando:boolean = false;
  cuenta:icuenta;




  constructor(public router:Router, 
    public movimientoService: MovimientosService, 
    public categoriasService:CategoriasService, 
    public session:GestionarSesionService,
    public cuentasService : CuentasService ) {
      this.cuenta = this.session.getCuenta();
      this.filtrarIngresos();


     }



  public backbtn(){
    this.router.navigateByUrl("/addmovimiento")
  }

  async filtrarIngresos(){
    this.ingresosFiltrados = [];
    this.categorias = [];
      if(this.mes == "Total"){
        await this.movimientoService.getMovimientos().subscribe({next: ingresos => this.ingresosFiltrados = ingresos})
      }
      else{
      await this.movimientoService.getMovimientos().pipe(
        map(ingresos => ingresos.filter
            (ingreso => (new Date(ingreso.fecha_mov).getMonth() == this.periodo.indexOf(this.mes) || this.mes == "Total") && ingreso.tipo_mov == 1)
          )
        ).subscribe({
        next: ingresos =>{
          this.ingresosFiltrados = ingresos;
        }
      });
    }
      

      await this.categoriasService.getCategorias().subscribe({
        next: categorias =>{
          categorias.forEach(categoria => {
            categoria.total_cat = 0;
            if(categoria.id_cue == this.session.getCuenta().id_cue){
              this.ingresosFiltrados.forEach(ingreso => {
                if(ingreso.tipo_mov == 1 && ingreso.id_cat == categoria.id_cat){
                  categoria.total_cat = ingreso.cantidad_mov + categoria.total_cat;
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
  
  public borrarmov(movimiento:imovimiento){
    this.movimientoService.EliminaMovimiento(movimiento.id_mov);
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
