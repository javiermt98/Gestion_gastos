import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Isession } from 'src/app/pojos/isession';


@Injectable({
  providedIn: 'root'
})
export class GestionarSesionService {

  private isUserLoggedIn:boolean  = false;
  private isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  public SessionLogged:Isession;

  constructor() { }

  setSession(Sesion:Isession) {
    this.isUserLoggedIn = true;
    this.isUserLoggedIn$.next(true);
    this.SessionLogged = Sesion;

    //localStorage.setItem('currentUser', JSON.stringify(Sesion));
    sessionStorage.setItem('currentUser', JSON.stringify(Sesion));
  }

  getSession() {
  	return JSON.parse(sessionStorage.getItem('currentUser'));
  }

  isAuthenticated(): Observable<boolean> {
    return this.isUserLoggedIn$.asObservable();
  };
  
  LogOut():void{
    //localStorage.removeItem('currentUser');
    this.isUserLoggedIn$.next(false);

    sessionStorage.removeItem('currentUser');
    this.SessionLogged = null;
    this.isUserLoggedIn = false;
  }

}
