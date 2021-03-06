import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DaoCategoriasService {

  API_ENDPOINT = 'http://localhost:80/api/api.php';

  constructor(private http: HttpClient) { }

  get(): Observable<[]> {               // Devuelve un array de json observable de la BD
      return  this.http.get<[]>(this.API_ENDPOINT + '/categoria')
      .pipe(catchError(this.handleError)); 
  }

  getId(id: number):  Observable<any> {  // Ahora devuelve un json de la BD
    return this.http.get<[]>(this.API_ENDPOINT + '/categoria/'+  id)    
    .pipe(catchError(this.handleError));  
  }

  put(categoria) {                       // Modificar producto en la BD
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.API_ENDPOINT + '/categorias/' + categoria.idcat , categoria,
                                     {headers: headers});
  }
  
  Nuevo(categoria) {                     // Nuevo producto en la BD
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.API_ENDPOINT + '/categoria', categoria, {headers: headers});
  }

  Eliminar(id:number){
    return this.http.delete(this.API_ENDPOINT + '/categoria/' + id);
  }


  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    console.error(`Backend returned code ${err.status}, body was: ${err}`);
    if (err.error instanceof ErrorEvent) {        
      errorMessage = `Ha passat un error: ${err.error.message}`;
    } else {
      errorMessage = `Codigo devuelto por el Server: ${err.status},\nMensaje: ${err.message}`;
    }
    alert(errorMessage);
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

