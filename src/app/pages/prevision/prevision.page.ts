import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { icategoria } from 'src/app/pojos/icategorias';
import { imovimiento } from 'src/app/pojos/imovimiento';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';
import { CategoriasService } from '../addcategoria/services/categoria.service';
import { MovimientosService } from '../addmovimiento/services/movimiento.service';

@Component({
  selector: 'app-prevision',
  templateUrl: './prevision.page.html',
  styleUrls: ['./prevision.page.scss'],
})
export class PrevisionPage implements OnInit {
  public gastos:imovimiento[];
  public categorias:icategoria[];
  public nombrecategorias:string[] = [];
  public totalcategorias:number[] = [];
  tiempo:string[] = ["Semanal","Mensual","Anual"];
  periodo:string="Mensual";
  bars: any;
  colorArray: any;
  @ViewChild('barChart') barChart;

  constructor(
    public movimientoService: MovimientosService, 
    public categoriasService:CategoriasService, 
    public session:GestionarSesionService ) { 
    
    this.gastos = [];
    this.categorias = [];

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

  this.categoriasService.getCategorias().subscribe({
    next: categorias =>{
      this.categorias = [];
      categorias.forEach(categoria => {
        categoria.total_cat = 0;
        if(categoria.id_cue == this.session.getCuenta().id_cue){
          this.gastos.forEach(gasto => {
            if(gasto.tipo_mov == 0 && gasto.id_cat == categoria.id_cat){
              categoria.total_cat = gasto.cantidad_mov + categoria.total_cat;
              
                if(this.categorias.indexOf(categoria) == -1) //Comprobar que la categoría no esté ya en la lista
                {

                  this.categorias.push(categoria);
                }
              }
          })
        
        }
        //Para que recoja el total distinto de 0
        if(categoria.total_cat != 0){
          this.nombrecategorias.push(categoria.nombre_cat);
          this.totalcategorias.push(categoria.total_cat);
        }

      })
    }
  });
  }

  public rellenararrays(){
    this.categorias.forEach(categoria => {
      this.nombrecategorias.push(categoria.nombre_cat);
      this.totalcategorias.push(categoria.total_cat);
    });
  }


  ngOnInit() {
    
    
  }

  //Se ejecuta después de cargar una página. 
  ionViewWillEnter() {
    
    this.createBarChart();
    this.rellenararrays();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.nombrecategorias,
        datasets: [{
          label: 'Gasto en Euros',
          data: this.totalcategorias,
          backgroundColor: 'rgb(231, 41, 0)', 
          borderColor: 'rgb(0, 0, 0)',
          borderWidth: 1
        }]
      },
      options: {
      }
    });
  }

}
