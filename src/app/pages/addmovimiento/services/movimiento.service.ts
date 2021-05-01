import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { imovimiento, MovimientoToAJSON, nuevomovimiento } from 'src/app/pojos/imovimiento';
import { DaoMovimientosService } from 'src/app/dao/dao_movimiento_service';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  
    private myCon:Subscription;
    private movimientos:imovimiento[]; 
    private movimiento:imovimiento; 
    private movimiento$=new Subject<imovimiento>();
    private movimientos$ =new Subject<imovimiento[]>();  // Objeto a observar cuando esta lleno.

    errorMessage = '';
    temp:any;

    constructor(private DaoMovimientos: DaoMovimientosService ) {}

    ngOnInit(): void {}
      
    getMovimientos(): Observable<imovimiento[]> {  
      
      this.myCon=this.DaoMovimientos.get().subscribe({
        next: movimiento => {          
          this.movimientos = MovimientoToAJSON(movimiento);          
          this.movimientos$.next(this.movimientos); // Emite evento que esta lleno !!  
          return this.movimientos$.asObservable();
        },
        error: err => this.errorMessage = err
      });
      return this.movimientos$.asObservable();
    }
 
    getMovimiento(id: number):Observable<imovimiento> {

       this.myCon=this.DaoMovimientos.getId(id).subscribe({
        next: movimiento => {
          this.movimientos$.next(movimiento); // Emite evento que esta lleno !!  
          return this.movimiento$.asObservable();
        },
        error: err => this.errorMessage = err
      });
      return this.movimiento$.asObservable();
        
    }

    UpdateMovimiento(p:imovimiento){
          
        this.DaoMovimientos.put(p).subscribe((Ok) => {      // Modifica la BD 
          //console.log(Ok); // 1 indica ok          
          let itemIndex = this.movimientos.findIndex(item => item.id_mov == p.id_mov);          
          this.movimientos[itemIndex] = p;
          this.movimientos$.next(this.movimientos); // Notifica que el array ha cambiado !! 
        }, (error) => {
          console.log("error edit:"+error);
        }) 

    }

    
    EliminaMovimiento(id:number){
        
      this.DaoMovimientos.Eliminar(id).subscribe((Ok) => {   // Elimina de la BB
        console.log(Ok); // 1 indica ok          
        let itemIndex = this.movimientos.findIndex(item => item.id_mov == id);          
        this.movimientos.splice(itemIndex,1); // Elimina un elemento desde itemIndex        
        this.movimientos$.next(this.movimientos); // Notifica que el array ha cambiado !!
      }, (error) => {
        console.log("error edit:"+error);
      }) 

  }

    
    NuevaCuenta(p:imovimiento){
      console.log(p);  
      this.DaoMovimientos.Nuevo(p).subscribe((NroReg) => { // Nuevo en la BD
        console.log("ok:"+NroReg);       
        let q=nuevomovimiento(NroReg, p.descripcion_mov,p.fecha_mov,p.cantidad_mov,p.id_cue, p.id_cat, p.tipo_mov);
        let itemIndex = this.movimientos.findIndex(item => item.id_mov == NroReg);
        if (itemIndex<0) this.movimientos.push(q);  
        this.movimientos$.next(this.movimientos); // Notifica que el array ha cambiado !!

      }, (error) => {
        console.log("error edit:"+error);
      }) 

    }

}