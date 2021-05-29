import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { DaoMovimientosPeriodicosService } from 'src/app/dao/dao_movimientoperiodico_service';
import { imovper, MovPerToAJSON, nuevomovper } from 'src/app/pojos/imovper';

@Injectable({
  providedIn: 'root'
})
export class MovPerService {
  
    private myCon:Subscription;
    private movimientos:imovper[]; 
    private movimiento:imovper; 
    private movimiento$=new Subject<imovper>();
    private movimientos$ =new Subject<imovper[]>();  // Objeto a observar cuando esta lleno.

    errorMessage = '';
    temp:any;

    constructor(private DaoMovPer: DaoMovimientosPeriodicosService ) {}

    ngOnInit(): void {}
      
    getMovimientos(): Observable<imovper[]> {  
      
      this.myCon=this.DaoMovPer.get().subscribe({
        next: movimiento => {          
          this.movimientos = MovPerToAJSON(movimiento);          
          this.movimientos$.next(this.movimientos); // Emite evento que esta lleno !!  
          return this.movimientos$.asObservable();
        },
        error: err => this.errorMessage = err
      });
      return this.movimientos$.asObservable();
    }
 
    getMovimiento(id: number):Observable<imovper> {

       this.myCon=this.DaoMovPer.getId(id).subscribe({
        next: movimiento => {
          this.movimientos$.next(movimiento); // Emite evento que esta lleno !!  
          return this.movimiento$.asObservable();
        },
        error: err => this.errorMessage = err
      });
      return this.movimiento$.asObservable();
        
    }

    UpdateMovimiento(p:imovper){
          
        this.DaoMovPer.put(p).subscribe((Ok) => {      // Modifica la BD 
          //console.log(Ok); // 1 indica ok          
          let itemIndex = this.movimientos.findIndex(item => item.id_movper == p.id_movper);          
          this.movimientos[itemIndex] = p;
          this.movimientos$.next(this.movimientos); // Notifica que el array ha cambiado !! 
        }, (error) => {
          console.log("error edit:"+error);
        }) 

    }

    
    EliminaMovimiento(id:number){
        
      this.DaoMovPer.Eliminar(id).subscribe((Ok) => {   // Elimina de la BB
        console.log(Ok); // 1 indica ok          
        let itemIndex = this.movimientos.findIndex(item => item.id_movper == id);          
        this.movimientos.splice(itemIndex,1); // Elimina un elemento desde itemIndex        
        this.movimientos$.next(this.movimientos); // Notifica que el array ha cambiado !!
      }, (error) => {
        console.log("error edit:"+error);
      }) 

  }

    
    NuevoMovimiento(p:imovper){
      console.log(p);  
      this.DaoMovPer.Nuevo(p).subscribe((NroReg) => { // Nuevo en la BD
        console.log("ok:"+NroReg);       
        let q=nuevomovper(NroReg, p.periodicidad,p.fecha_movper,p.cantidad_movper, p.id_cat, p.tipo_movper, p.descripcion_movper);
        let itemIndex = this.movimientos.findIndex(item => item.id_movper == NroReg);
        if (itemIndex<0) this.movimientos.push(q);  
        this.movimientos$.next(this.movimientos); // Notifica que el array ha cambiado !!

      }, (error) => {
        console.log("error edit:"+error);
      }) 

    }

}