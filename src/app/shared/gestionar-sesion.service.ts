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
    this.isUserLoggedIn$ = new BehaviorSubject<boolean>(false)
    if(sessionStorage.getItem('currentUser') != null){
      this.isUserLoggedIn$.next(true);
    };
  }

  setSession(Sesion:Isession) {
    this.isUserLoggedIn = true;
    this.isUserLoggedIn$.next(true);
    this.SessionLogged = Sesion;
    sessionStorage.setItem('currentUser', JSON.stringify(Sesion));
  }

  getSession() {
    this.SessionLogged = JSON.parse(sessionStorage.getItem('currentUser'));
  	return  this.SessionLogged;
  }

  isAuthenticated(): Observable<boolean> {
    return this.isUserLoggedIn$.asObservable();
  };
  
  LogOut():void{
    this.isUserLoggedIn$.next(false);

    sessionStorage.removeItem('currentUser');
    this.SessionLogged = null;
    this.isUserLoggedIn = false;
    this.isUserLoggedIn$.next(false);
  }

}
