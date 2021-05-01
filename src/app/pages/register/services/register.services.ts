import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { iregister, RegistrosToAJSON, nuevoregistro } from 'src/app/pojos/iregister';
import { DaoRegisterService } from 'src/app/dao/dao_register_service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
    private myCon:Subscription;
    private registros:iregister[]; 
    private registro:iregister; 
    private registro$=new Subject<iregister>();
    private registros$ =new Subject<iregister[]>();  // Objeto a observar cuando esta lleno.

    errorMessage = '';
    temp:any;

    constructor(private DaoRegisters: DaoRegisterService ) {}

    ngOnInit(): void {}
      
    getRegistros(): Observable<iregister[]> {  
      
      this.myCon=this.DaoRegisters.get().subscribe({
        next: registro => {          
          this.registros = RegistrosToAJSON(registro);          
          this.registros$.next(this.registros); // Emite evento que esta lleno !!  
          return this.registros$.asObservable();
        },
        error: err => this.errorMessage = err
      });
      return this.registros$.asObservable();
    }
 
    getRegistro(id: number):Observable<iregister> {

       this.myCon=this.DaoRegisters.getId(id).subscribe({
        next: registro => {
          this.registros$.next(registro); // Emite evento que esta lleno !!  
          return this.registro$.asObservable();
        },
        error: err => this.errorMessage = err
      });
      return this.registro$.asObservable();
        
    }

    UpdateRegistro(p:iregister){
          
        this.DaoRegisters.put(p).subscribe((Ok) => {      // Modifica la BD 
          //console.log(Ok); // 1 indica ok          
          let itemIndex = this.registros.findIndex(item => item.id_login == p.id_login);          
          this.registros[itemIndex] = p;
          this.registros$.next(this.registros); // Notifica que el array ha cambiado !! 
        }, (error) => {
          console.log("error edit:"+error);
        }) 

    }

    
    EliminaRegistro(id:number){
        
      this.DaoRegisters.Eliminar(id).subscribe((Ok) => {   // Elimina de la BB
        console.log(Ok); // 1 indica ok          
        let itemIndex = this.registros.findIndex(item => item.id_login == id);          
        this.registros.splice(itemIndex,1); // Elimina un elemento desde itemIndex        
        this.registros$.next(this.registros); // Notifica que el array ha cambiado !!
      }, (error) => {
        console.log("error edit:"+error);
      }) 

  }

    
    NuevoRegistro(p:iregister){
      console.log(p);  
      this.DaoRegisters.Nuevo(p).subscribe((NroReg) => { // Nuevo en la BD
        console.log("ok:"+NroReg);       
        let q=nuevoregistro(NroReg, p.nombre_log,p.apellidos_log,p.correo_log,p.nacimiento_log, p.pwd_log);
        let itemIndex = this.registros.findIndex(item => item.id_login == NroReg);
        if (itemIndex<0) this.registros.push(q);  
        this.registros$.next(this.registros); // Notifica que el array ha cambiado !!

      }, (error) => {
        console.log("error edit:"+error);
      }) 

    }

}