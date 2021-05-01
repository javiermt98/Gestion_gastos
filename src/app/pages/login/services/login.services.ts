import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    API_ENDPOINT = 'http://localhost:80/api/api.php';
    constructor(private http: HttpClient) {}

    login(user: any): Observable<any> {
      return this.http.get(this.API_ENDPOINT + '/authenticate/login', user);
    }


}