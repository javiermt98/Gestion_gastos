import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Página Principal', url: '/folder/Principal', icon: 'accessibility' },
    { title: 'Gastos', url: '/folder/Gastos', icon: 'remove-circle' },
    { title: 'Ingresos', url: '/folder/Ingresos', icon: 'add-circle' },
    { title: 'Categorías', url: '/folder/Categorias', icon: 'file-tray-full' },
    { title: 'Previsión de Gastos', url: '/folder/Prevision', icon: 'stats-chart' },
    { title: 'Políticas de Privacidad', url: '/folder/Privacy', icon: 'information-circle' },
    { title: 'Sobre la aplicación', url: '/folder/About', icon: 'help-circle' },

  ];
  
  constructor() {}
}
