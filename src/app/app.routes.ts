import { HomeLanding } from './pages/public/home-landing/home-landing';
import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { ProductsComponent } from './pages/products/products';
import { ProductFormComponent } from './pages/product-form/product-form';
import { CategoriesComponent } from './pages/categories/categories';
import { CategoryFormComponent } from './pages/category-form/category-form';
import { ProductTypesComponent } from './pages/product-types/product-types';
import { ProductTypeFormComponent } from './pages/product-type-form/product-type-form';

export const routes: Routes = [
  // HomeLanding - Sistema público separado
  { path: '', component: HomeLanding },
  
  // Sistema de Gestión - Rutas protegidas
  { path: 'admin', children: [
    { path: 'login', component: Login },
    { path: 'home', component: Home, canActivate: [authGuard] },
    
    // Products
    { path: 'products', component: ProductsComponent },
    { path: 'products/new', component: ProductFormComponent, canActivate: [authGuard] },
    { path: 'products/edit/:id', component: ProductFormComponent, canActivate: [authGuard] },
    { path: 'products/product-type/:productTypeId', component: ProductsComponent },
    
    // Categories
    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/new', component: CategoryFormComponent, canActivate: [authGuard] },
    { path: 'categories/edit/:id', component: CategoryFormComponent, canActivate: [authGuard] },
    
    // Product Types
    { path: 'product-types', component: ProductTypesComponent },
    { path: 'product-types/new', component: ProductTypeFormComponent, canActivate: [authGuard] },
    { path: 'product-types/edit/:id', component: ProductTypeFormComponent, canActivate: [authGuard] },
    { path: 'product-types/category/:categoryId', component: ProductTypesComponent },
  ]},
  
  // Redirecciones para compatibilidad
  { path: 'login', redirectTo: '/admin/login', pathMatch: 'full' },
  { path: 'home', redirectTo: '/admin/home', pathMatch: 'full' },
  { path: 'products', redirectTo: '/admin/products', pathMatch: 'full' },
  { path: 'categories', redirectTo: '/admin/categories', pathMatch: 'full' },
  { path: 'product-types', redirectTo: '/admin/product-types', pathMatch: 'full' },
  
  { path: '**', redirectTo: '' }
];
