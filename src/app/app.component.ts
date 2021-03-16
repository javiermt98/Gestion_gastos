import { Component } from '@angular/core';
import { icuenta } from './services/icuenta';
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

  ];

  cuenta:icuenta = {
    num_cue:234,
    propietario:"Javier",
    nombre_cue:"Main Account",  
    saldo_cue:100000
  };
 
  constructor() {}

}
