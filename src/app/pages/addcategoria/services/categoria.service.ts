import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { icategoria,nuevacategoria, CategoriasToAJSON} from 'src/app/pojos/icategorias';
import { DaoCategoriasService } from 'src/app/dao/dao_categorias_service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  
    private myCon:Subscription;
    private categorias:icategoria[]; 
    private categoria:icategoria; 
    private categoria$=new Subject<icategoria>();
    private categorias$ =new Subject<icategoria[]>();  // Objeto a observar cuando esta lleno.

    errorMessage = '';
    temp:any;

    constructor(private DaoCateogiras: DaoCategoriasService ) {}

    ngOnInit(): void {}
      
    getCategorias(): Observable<icategoria[]> {  
      
      this.myCon=this.DaoCateogiras.get().subscribe({
        next: categoria => {          
          this.categorias = CategoriasToAJSON(categoria);          
          this.categorias$.next(this.categorias); // Emite evento que esta lleno !!  
          return this.categorias$.asObservable();
        },
        error: err => this.errorMessage = err
      });
      return this.categorias$.asObservable();
    }

    
 
    getCategoria(id: number):Observable<icategoria> {

       this.myCon=this.DaoCateogiras.getId(id).subscribe({
        next: categoria => {
          this.categoria$.next(categoria); // Emite evento que esta lleno !!  
          return this.categoria$.asObservable();
        },
        error: err => this.errorMessage = err
      });
      return this.categoria$.asObservable();
        
    }

    UpdateCategoria(p:icategoria){
          
        this.DaoCateogiras.put(p).subscribe((Ok) => {      // Modifica la BD 
          //console.log(Ok); // 1 indica ok          
          let itemIndex = this.categorias.findIndex(item => item.id_cat == p.id_cat);          
          this.categorias[itemIndex] = p;
          this.categorias$.next(this.categorias); // Notifica que el array ha cambiado !! 
        }, (error) => {
          console.log("error edit:"+error);
        }) 

    }

    
    EliminaCategoria(id:number){
        
      this.DaoCateogiras.Eliminar(id).subscribe((Ok) => {   // Elimina de la BB
        console.log(Ok); // 1 indica ok          
        let itemIndex = this.categorias.findIndex(item => item.id_cat == id);          
        this.categorias.splice(itemIndex,1); // Elimina un elemento desde itemIndex        
        this.categorias$.next(this.categorias); // Notifica que el array ha cambiado !!
      }, (error) => {
        console.log("error edit:"+error);
      }) 

  }

    
    NuevaCategoria(p:icategoria){
      console.log(p);  
      this.DaoCateogiras.Nuevo(p).subscribe((NroReg) => { // Nuevo en la BD
        console.log("que es ok:"+NroReg);       
        let q=nuevacategoria(NroReg ,p.nombre_cat,p.max_gasto_cat,p.icono_cat,p.id_cat_padre, p.id_cue);
        let itemIndex = this.categorias.findIndex(item => item.id_cat == NroReg);
        if (itemIndex<0) this.categorias.push(q);  
        this.categorias$.next(this.categorias); // Notifica que el array ha cambiado !!

      }, (error) => {
        console.log("error edit:"+error);
      }) 

    }

}