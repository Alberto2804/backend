import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then(m => m.RegistroPage),
  },
  {
    path: 'misiones',
    loadComponent: () => import('./misiones/misiones.page').then(m => m.MisionesPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then(m => m.PerfilPage),
    canActivate: [AuthGuard] 
  },
  {
    path: 'detalle-mision',
    loadComponent: () => import('./detalle-mision/detalle-mision.page').then(m => m.DetalleMisionPage),
    canActivate: [AuthGuard] 
  },
];