import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mainpage',
    pathMatch: 'full'
  },
  {
    path: 'gastos',
    loadChildren: () => import('./pages/gastos/gastos.module').then( m => m.GastosPageModule)
  },
  {
    path: 'ingresos',
    loadChildren: () => import('./pages/ingresos/ingresos.module').then( m => m.IngresosPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'prevision',
    loadChildren: () => import('./pages/prevision/prevision.module').then( m => m.PrevisionPageModule)
  },
  {
    path: 'mainpage',
    loadChildren: () => import('./pages/mainpage/mainpage.module').then( m => m.MainpagePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./pages/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },  {
    path: 'addcategoria',
    loadChildren: () => import('./pages/addcategoria/addcategoria.module').then( m => m.AddcategoriaPageModule)
  },
  {
    path: 'addmovimiento',
    loadChildren: () => import('./pages/addmovimiento/addmovimiento.module').then( m => m.AddmovimientoPageModule)
  },
  {
    path: 'addcuenta',
    loadChildren: () => import('./pages/addcuenta/addcuenta.module').then( m => m.AddcuentaPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
