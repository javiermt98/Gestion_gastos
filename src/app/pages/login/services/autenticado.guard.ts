import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GestionarSesionService } from '../../../shared/gestionar-sesion.service';


@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanActivate {
  
  constructor(private router:   Router,
              private Session:  GestionarSesionService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.Session.isAuthenticated()) {
        return true;
      }
      this.Session.LogOut();
      this.router.navigate(['/login']);
      return false;
  }



  
}
