import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { icategoria } from 'src/app/pojos/icategorias';
import { imovimiento } from 'src/app/pojos/imovimiento';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';
import { CategoriasService } from '../addcategoria/services/categoria.service';
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
  periodo:string[] = ["Semana", "Mes", "Año", "Total"];
  tiempo:string="Total";

  constructor(public router:Router, 
    public movimientoService: MovimientosService, 
    public categoriasService:CategoriasService, 
    public session:GestionarSesionService ) { 

      this.gastos = [];
      this.categorias = [];
      console.log(this.session.getCuenta().id_cue)
    this.categoriasService.getCategorias().subscribe({
      next: categorias =>{
        this.categorias = [];
        categorias.forEach(categoria => {
          if(categoria.id_cue == this.session.getCuenta().id_cue){
          this.categorias.push(categoria)
          }
        })
      }
    });

    this.movimientoService.getMovimientos().subscribe({
      next: gastos =>{
        this.gastos = [];
        gastos.forEach(gasto => {
          if(gasto.tipo_mov == 0){
              this.gastos.push(gasto);
            }
        })
      }
    });
}

  public backbtn(){
    this.router.navigateByUrl("/addmovimiento")
  }

  ngOnInit() {

  }

}
