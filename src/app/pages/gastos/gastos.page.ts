import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  public gastos:imovimiento[];
  public gasto:imovimiento;
  public categorias:icategoria[];
  public categoria:icategoria;
  periodo:string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "Total" ];
  mes:string=this.periodo[new Date().getMonth()];
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
      this.gastos = [];
      this.categorias = [];
      setTimeout(() => {
        this.filtrarGastos();
      }, 100);
      
    
}

  public backbtn(){
    this.router.navigateByUrl("/addmovimiento")
  }

  filtrarGastos(){
    this.movimientoService.getMovimientos().subscribe({
      next: gastos =>{
        this.gastos = [];
        this.gastosFiltrados = [];
        gastos.forEach(gasto => {
          if(gasto.tipo_mov == 0){
              this.gastos.push(gasto);
              if(this.mes == "Total"){
                this.gastosFiltrados.push(gasto)
              }
              else{
                if(new Date(gasto.fecha_mov).getMonth() == this.periodo.indexOf(this.mes) && new Date(gasto.fecha_mov).getFullYear() == new Date().getFullYear()){
                  this.gastosFiltrados.push(gasto);
                  
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
    this.filtrarGastos();
  }

  public borrarmov(movimiento:imovimiento){
    this.movimientoService.EliminaMovimiento(movimiento.id_mov);
    this.cuenta.saldo_cue = this.cuenta.saldo_cue + movimiento.cantidad_mov;
    this.cuentasService.UpdateCuenta(this.cuenta);
    this.session.setCuenta(this.cuenta);
  }

}
