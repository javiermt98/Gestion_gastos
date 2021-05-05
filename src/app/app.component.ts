import { Component } from '@angular/core';
import { GestionarSesionService } from './shared/gestionar-sesion.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  logged:boolean = true;
  constructor( public session: GestionarSesionService) {
    this.session.isAuthenticated().subscribe(logged => this.appPages.forEach(login => {
      if(login.log=="si"){login.visibility = !logged; console.log(logged)}
      else{login.visibility = logged;  console.log(logged)}
  }));
    
  }

  

  public appPages = [
    { title: 'Página Principal', url: 'mainpage', icon: 'accessibility', visibility: this.logged, log: "si" },
    { title: 'Gastos', url: 'gastos', icon: 'remove-circle', visibility:this.logged, log: "si" },
    { title: 'Ingresos', url: 'ingresos', icon: 'add-circle', visibility:this.logged, log: "si" },
    { title: 'Categorías', url: 'categorias', icon: 'file-tray-full', visibility:this.logged, log: "si" },
    { title: 'Previsión de Gastos', url: 'prevision', icon: 'stats-chart', visibility:this.logged, log: "si" },
    { title: 'Políticas de Privacidad', url: 'privacy', icon: 'information-circle', visibility:this.logged, log: "si" },
    { title: 'Sobre la aplicación', url: 'about', icon: 'help-circle', visibility:this.logged, log: "si" },
    { title: 'Cerrar Sesión', url: 'logout', icon: 'log-out', visibility:this.logged, log: "si" },
    { title: 'Entrar a mi cuenta', url: 'login', icon: 'log-in', visibility:this.logged, log: "no" },
    { title: 'Registrarse', url: 'register', icon: 'person-add', visibility:this.logged, log: "no" },
    { title: 'Recuperar Contraseña', url: 'forgotpwd', icon: 'refresh', visibility:this.logged, log: "no" },

  ];
 
  
  
    
}
