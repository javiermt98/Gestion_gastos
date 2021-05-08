import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Isession } from 'src/app/pojos/isession';


@Injectable({
  providedIn: 'root'
})
export class GestionarSesionService {

  private isUserLoggedIn:boolean;
  private isUserLoggedIn$:BehaviorSubject<boolean> ;
  public SessionLogged:Isession;

  constructor() { 
    this.isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  }

  setSession(Sesion:Isession) {
    this.isUserLoggedIn = true;
    console.log(this.isUserLoggedIn$.asObservable());
    this.isUserLoggedIn$.next(true);
    console.log(this.isUserLoggedIn$.asObservable());
    this.SessionLogged = Sesion;

    localStorage.setItem('currentUser', JSON.stringify(Sesion));
    //sessionStorage.setItem('currentUser', JSON.stringify(Sesion));
  }

  getSession() {
  	return JSON.parse(localStorage.getItem('currentUser'));
  }

  isAuthenticated(): Observable<boolean> {
    return this.isUserLoggedIn$.asObservable();
  };
  
  LogOut():void{
    localStorage.removeItem('currentUser');
    //this.isUserLoggedIn$.next(false);

    sessionStorage.removeItem('currentUser');
    this.SessionLogged = null;
    this.isUserLoggedIn = false;
    this.isUserLoggedIn$.next(false);
  }

}
