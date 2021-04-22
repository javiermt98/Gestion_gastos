import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { icuenta, cuentaVacia, CuentasToAJSON, nuevacuenta } from 'src/app/pojos/icuenta';
import { DaoCuentasService } from 'src/app/dao/dao_cuenta_service';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {
  
    private myCon:Subscription;
    private cuentas:icuenta[]; 
    private cuenta:icuenta; 
    private cuenta$=new Subject<icuenta>();
    private cuentas$ =new Subject<icuenta[]>();  // Objeto a observar cuando esta lleno.

    errorMessage = '';
    temp:any;

    constructor(private DaoCuentas: DaoCuentasService ) {}

    ngOnInit(): void {}
      
    getCuentas(): Observable<icuenta[]> {  
      
      this.myCon=this.DaoCuentas.get().subscribe({
        next: cuenta => {          
          this.cuentas = CuentasToAJSON(cuenta);          
          this.cuentas$.next(this.cuentas); // Emite evento que esta lleno !!  
          return this.cuentas$.asObservable();
        },
        error: err => this.errorMessage = err
      });
      return this.cuentas$.asObservable();
    }
 
    getCuenta(id: number):Observable<icuenta> {

       this.myCon=this.DaoCuentas.getId(id).subscribe({
        next: cuenta => {
          this.cuentas$.next(cuenta); // Emite evento que esta lleno !!  
          return this.cuenta$.asObservable();
        },
        error: err => this.errorMessage = err
      });
      return this.cuenta$.asObservable();
        
    }

    UpdateCuenta(p:icuenta){
          
        this.DaoCuentas.put(p).subscribe((Ok) => {      // Modifica la BD 
          //console.log(Ok); // 1 indica ok          
          let itemIndex = this.cuentas.findIndex(item => item.id_cue == p.id_cue);          
          this.cuentas[itemIndex] = p;
          this.cuentas$.next(this.cuentas); // Notifica que el array ha cambiado !! 
        }, (error) => {
          console.log("error edit:"+error);
        }) 

    }

    
    EliminaCuenta(id:number){
        
      this.DaoCuentas.Eliminar(id).subscribe((Ok) => {   // Elimina de la BB
        console.log(Ok); // 1 indica ok          
        let itemIndex = this.cuentas.findIndex(item => item.id_cue == id);          
        this.cuentas.splice(itemIndex,1); // Elimina un elemento desde itemIndex        
        this.cuentas$.next(this.cuentas); // Notifica que el array ha cambiado !!
      }, (error) => {
        console.log("error edit:"+error);
      }) 

  }

    
    NuevaCuenta(p:icuenta){
      console.log(p);  
      this.DaoCuentas.Nuevo(p).subscribe((NroReg) => { // Nuevo en la BD
        console.log("que es ok:"+NroReg);       
        let q=nuevacuenta(NroReg, p.nombre_cue,p.num_cue,p.propietario,p.saldo_cue);
        let itemIndex = this.cuentas.findIndex(item => item.id_cue == NroReg);
        if (itemIndex<0) this.cuentas.push(q);  
        this.cuentas$.next(this.cuentas); // Notifica que el array ha cambiado !!

      }, (error) => {
        console.log("error edit:"+error);
      }) 

    }

}