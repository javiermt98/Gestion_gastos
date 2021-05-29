import { Component } from '@angular/core';
import { GestionarSesionService } from './shared/gestionar-sesion.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public logged:boolean = false;
  constructor( public session: GestionarSesionService) { 

  this.session.isAuthenticated().subscribe(logged => this.logged = logged);
  }


  public appPagesLogOut = [
    { title: 'Entrar a mi cuenta', url: 'login', icon: 'log-in'},
    { title: 'Registrarse', url: 'register', icon: 'person-add'},
    { title: 'Recuperar Contraseña', url: 'forgotpwd', icon: 'refresh'}
  ];

  public appPagesLogIn = [
    { title: 'Página Principal', url: 'mainpage', icon: 'accessibility'},
    { title: 'Gastos', url: 'gastos', icon: 'remove-circle'},
    { title: 'Ingresos', url: 'ingresos', icon: 'add-circle'},
    { title: 'Movimiento Periódico', url: 'movper', icon: 'calendar-number'},
    { title: 'Categorías', url: 'categorias', icon: 'file-tray-full'},
    { title: 'Previsión de Gastos', url: 'prevision', icon: 'stats-chart'},
    { title: 'Políticas de Privacidad', url: 'privacy', icon: 'information-circle'},
    { title: 'Sobre la aplicación', url: 'about', icon: 'help-circle'},
    { title: 'Cerrar Sesión', url: 'logout', icon: 'log-out'}

  ];


  

 
 
  
  
    
}
