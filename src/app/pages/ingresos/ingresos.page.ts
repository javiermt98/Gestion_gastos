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
  periodo:string[] = ["Semana", "Mes", "Año", "Total"];
  tiempo:string="Total";
  public ingresos:imovimiento[];
  public categorias:icategoria[];



  constructor(public router:Router, 
    public movimientoService: MovimientosService, 
    public categoriasService:CategoriasService, 
    public session:GestionarSesionService ) {
      this.ingresos = [];
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
      next: ingresos =>{
        this.ingresos = [];
        ingresos.forEach(ingreso => {
          if(ingreso.tipo_mov == 1){
              this.ingresos.push(ingreso);
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
