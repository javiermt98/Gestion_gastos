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
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  public gasto:imovimiento;
  public categorias:icategoria[];
  public categoria:icategoria;
  periodo:string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "Total" ];
  mes:string="Total";
  public gastosFiltrados:imovimiento[] = [];
  borrando:boolean = false;
  cuenta:icuenta;


  constructor(public router:Router, 
    public movimientoService: MovimientosService, 
    public categoriasService:CategoriasService, 
    public session:GestionarSesionService,
    public cuentasService : CuentasService,
    ) { 
      this.cuenta = this.session.getCuenta();
      this.categorias = [];
      this.filtrarGastos();

      
    
}

  public backbtn(){
    this.router.navigateByUrl("/addmovimiento")
  }

  filtrarGastos(){

      if(this.mes == "Total"){
        this.movimientoService.getMovimientos().subscribe({next: gastos => this.gastosFiltrados = gastos})
      }
      else{
        this.movimientoService.getMovimientos().pipe(
          map(gastos => gastos.filter
              (gasto => new Date(gasto.fecha_mov).getMonth()==this.periodo.indexOf(this.mes) && gasto.tipo_mov == 0)
            )
          ).subscribe({
          next: gastos =>{
            console.log(new Date(gastos[0].fecha_mov).getMonth())
            this.gastosFiltrados = gastos;
          }
        });
      }
      this.categoriasService.getCategorias().subscribe({
        next: categorias =>{
          this.categorias = [];
          categorias.forEach(categoria => {
            categoria.total_cat = 0;
            if(categoria.id_cue == this.session.getCuenta().id_cue){
              this.gastosFiltrados.forEach(gasto => {
                if(gasto.tipo_mov == 0 && gasto.id_cat == categoria.id_cat){
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

  public borrarmov(movimiento:imovimiento){
    this.movimientoService.EliminaMovimiento(movimiento.id_mov);
  }

}
