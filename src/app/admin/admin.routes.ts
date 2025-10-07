import { Routes } from '@angular/router';
import { authGuard } from '../auth.guard';

export const adminRoutes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('../pages/login/login').then(m => m.Login)
  },
  { 
    path: 'home', 
    loadComponent: () => import('../pages/home/home').then(m => m.Home),
    canActivate: [authGuard]
  },
  
  // Products - Lazy loading
  { 
    path: 'products', 
    loadComponent: () => import('../pages/products/products').then(m => m.ProductsComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'products/new', 
    loadComponent: () => import('../pages/product-form/product-form').then(m => m.ProductFormComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'products/edit/:id', 
    loadComponent: () => import('../pages/product-form/product-form').then(m => m.ProductFormComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'products/product-type/:productTypeId', 
    loadComponent: () => import('../pages/products/products').then(m => m.ProductsComponent),
    canActivate: [authGuard]
  },
  
  // Categories - Lazy loading
  { 
    path: 'categories', 
    loadComponent: () => import('../pages/categories/categories').then(m => m.CategoriesComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'categories/new', 
    loadComponent: () => import('../pages/category-form/category-form').then(m => m.CategoryFormComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'categories/edit/:id', 
    loadComponent: () => import('../pages/category-form/category-form').then(m => m.CategoryFormComponent),
    canActivate: [authGuard]
  },
  
  // Product Types - Lazy loading
  { 
    path: 'product-types', 
    loadComponent: () => import('../pages/product-types/product-types').then(m => m.ProductTypesComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'product-types/new', 
    loadComponent: () => import('../pages/product-type-form/product-type-form').then(m => m.ProductTypeFormComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'product-types/edit/:id', 
    loadComponent: () => import('../pages/product-type-form/product-type-form').then(m => m.ProductTypeFormComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'product-types/category/:categoryId', 
    loadComponent: () => import('../pages/product-types/product-types').then(m => m.ProductTypesComponent),
    canActivate: [authGuard]
  },
  
  // Redirección por defecto
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
