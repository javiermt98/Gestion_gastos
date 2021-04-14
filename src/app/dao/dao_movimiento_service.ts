import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DaoMovimientosService {

  API_ENDPOINT = 'http://localhost:80/php-crud/api.php';

  constructor(private http: HttpClient) { }

  get(): Observable<[]> {               // Devuelve un array de json observable de la BD
      return  this.http.get<[]>(this.API_ENDPOINT + '/movimiento')
      .pipe(catchError(this.handleError)); 
  }

  getId(id: number):  Observable<any> {  // Ahora devuelve un json de la BD
    return this.http.get<[]>(this.API_ENDPOINT + '/movimiento/'+  id)    
    .pipe(catchError(this.handleError));  
  }

  put(movimiento) {                       // Modificar producto en la BD
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.API_ENDPOINT + '/movimiento/' + movimiento.id_mov , movimiento,
                                     {headers: headers});
  }
  
  Nuevo(movimiento) {                     // Nuevo producto en la BD
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.API_ENDPOINT + '/movimiento', movimiento, {headers: headers});
  }

  Eliminar(id:number){
    return this.http.delete(this.API_ENDPOINT + '/movimiento/' + id);
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

