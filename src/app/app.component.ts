import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Página Principal', url: 'mainpage', icon: 'accessibility' },
    { title: 'Gastos', url: 'gastos', icon: 'remove-circle' },
    { title: 'Ingresos', url: 'ingresos', icon: 'add-circle' },
    { title: 'Categorías', url: 'categorias', icon: 'file-tray-full' },
    { title: 'Previsión de Gastos', url: 'prevision', icon: 'stats-chart' },
    { title: 'Políticas de Privacidad', url: 'privacy', icon: 'information-circle' },
    { title: 'Sobre la aplicación', url: 'about', icon: 'help-circle' },
    { title: 'Cerrar Sesión', url: 'logout', icon: 'log-out' },
    { title: 'Entrar a mi cuenta', url: 'login', icon: 'log-in' },
    { title: 'Registrarse', url: 'register', icon: 'person-add' },
    { title: 'Recuperar Contraseña', url: 'forgotpwd', icon: 'refresh' },

  ];
 
  
  constructor() {}

}
