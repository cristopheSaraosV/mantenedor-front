import { HomeLanding } from './pages/public/home-landing/home-landing';
import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  // HomeLanding - Sistema público separado
  { path: '', component: HomeLanding },
  
  // Sistema de Gestión - Rutas protegidas con lazy loading
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes),
    canActivate: [authGuard]
  },
  
  // Redirecciones para compatibilidad
  { path: 'login', redirectTo: '/admin/login', pathMatch: 'full' },
  { path: 'home', redirectTo: '/admin/home', pathMatch: 'full' },
  { path: 'products', redirectTo: '/admin/products', pathMatch: 'full' },
  { path: 'categories', redirectTo: '/admin/categories', pathMatch: 'full' },
  { path: 'product-types', redirectTo: '/admin/product-types', pathMatch: 'full' },
  
  // Ruta wildcard para manejar rutas no encontradas
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
