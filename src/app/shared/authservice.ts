import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserResponse  } from '../pojos/ilogin';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<UserResponse>;
    public user: Observable<UserResponse>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<UserResponse>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): UserResponse {
        return this.userSubject.value;
    }

    login(correo_log, pwd_log) {
        return this.http.post<UserResponse>(`${environment.API_ENDPOINT}/auth/login`, { correo_log, pwd_log })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    register(user: UserResponse) {
        return this.http.post(`${environment.API_ENDPOINT}/login/`, user);
    }

    getAll() {
        return this.http.get<UserResponse[]>(`${environment.API_ENDPOINT}/login`);
    }

    getById(id: string) {
        return this.http.get<UserResponse>(`${environment.API_ENDPOINT}/login/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.API_ENDPOINT}/login/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id_log) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: number) {
        return this.http.delete(`${environment.API_ENDPOINT}/login/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id_log) {
                    this.logout();
                }
                return x;
            }));
    }
}