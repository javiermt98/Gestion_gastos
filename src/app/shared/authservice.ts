import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ilogin, UserResponse } from '../pojos/ilogin';

@Injectable({
    providedIn: 'root',
})
export class AuthService{
    API_ENDPOINT = 'http://localhost:80/api/api.php';
    constructor(public http: HttpClient){}

    login(authData:ilogin):Observable<UserResponse | void>{
        return this.http.post<UserResponse>(this.API_ENDPOINT+'/authenticate/login', authData)
        .pipe(
            map( (res: UserResponse) => {
                console.log(res);
                this.saveToken()
            }),
            catchError((err)=> this.handlerError(err)));
    }
    logout():void{}
    private readToken():void{}
    private saveToken():void{}
    private handlerError(err):Observable<never>{
        let errorMessage = 'Ha ocurrido un error';
        if (err){
            errorMessage = 'Error: code ${err.message}';
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}