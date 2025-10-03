import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

export interface Product {
  id?: number;
  model: string;
  description?: string;
  price?: number;
  stock: number;
  brand?: string;
  country?: string;
  technicalSpecs?: string;
  imageUrl?: string;
  isActive: boolean;
  sortOrder?: number;
  productTypeId: number;
  productType?: ProductType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductType {
  id?: number;
  name: string;
  description?: string;
  specifications?: string;
  isActive: boolean;
  sortOrder?: number;
  categoryId: number;
  category?: Category;
  products?: Product[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id?: number;
  name: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  sortOrder?: number;
  productTypes?: ProductType[];
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?active=true`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/category/${categoryId}`);
  }

  getProductsByProductType(productTypeId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/product-type/${productTypeId}`);
  }

  // Categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }

  createCategory(category: Omit<Category, 'id'>): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/categories`, category);
  }

  updateCategory(id: number, category: Partial<Category>): Observable<Category> {
    return this.http.patch<Category>(`${this.apiUrl}/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
  }

  // Product Types
  getProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${this.apiUrl}/product-types`);
  }

  getProductTypesByCategory(categoryId: number): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${this.apiUrl}/product-types/category/${categoryId}`);
  }

  getProductTypeById(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`${this.apiUrl}/product-types/${id}`);
  }

  createProductType(productType: Omit<ProductType, 'id'>): Observable<ProductType> {
    return this.http.post<ProductType>(`${this.apiUrl}/product-types`, productType);
  }

  updateProductType(id: number, productType: Partial<ProductType>): Observable<ProductType> {
    return this.http.patch<ProductType>(`${this.apiUrl}/product-types/${id}`, productType);
  }

  deleteProductType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/product-types/${id}`);
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  updateStock(id: number, stock: number): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/products/${id}/stock`, { stock });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }
}
