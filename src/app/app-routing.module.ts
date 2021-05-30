import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './shared/guard/auth.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'gastos',
    loadChildren: () => import('./pages/gastos/gastos.module').then( m => m.GastosPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'ingresos',
    loadChildren: () => import('./pages/ingresos/ingresos.module').then( m => m.IngresosPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then( m => m.CategoriasPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'prevision',
    loadChildren: () => import('./pages/prevision/prevision.module').then( m => m.PrevisionPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'mainpage',
    loadChildren: () => import('./pages/mainpage/mainpage.module').then( m => m.MainpagePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'privacy',
    loadChildren: () => import('./pages/privacy/privacy.module').then( m => m.PrivacyPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'addcategoria',
    loadChildren: () => import('./pages/addcategoria/addcategoria.module').then( m => m.AddcategoriaPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'addmovimiento',
    loadChildren: () => import('./pages/addmovimiento/addmovimiento.module').then( m => m.AddmovimientoPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'addcuenta',
    loadChildren: () => import('./pages/addcuenta/addcuenta.module').then( m => m.AddcuentaPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgotpwd',
    loadChildren: () => import('./pages/forgotpwd/forgotpwd.module').then( m => m.ForgotpwdPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'addmovper',
    loadChildren: () => import('./pages/addmovper/addmovper.module').then( m => m.AddmovperPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'movper',
    loadChildren: () => import('./pages/movper/movper.module').then( m => m.MovperPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo:'/404'
  },
  {
    path: '404',
    loadChildren: () => import('./pages/notfound404page/notfound404page.module').then( m => m.Notfound404pagePageModule)
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
