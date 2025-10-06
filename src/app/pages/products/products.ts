import { Component, OnInit, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { AuthService } from '../../auth.service';
import { MaterialModules } from '../../material.module';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ...MaterialModules],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);


  products: Product[] = [];
  loading = true;
  error: string | null = null;
  showActiveOnly = true;


  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this.loading = true;
    this.error = null;

    // Obtener productTypeId de la URL
    const productTypeId = this.router.url.split('/')[4];
    const categoryId = this.router.parseUrl(this.router.url).queryParams['categoryId'];


    let request;
    
    if (productTypeId) {
      // Si hay productTypeId, obtener productos por tipo de producto
      request = this.productService.getProductsByProductType(+productTypeId);
    } else if (categoryId) {
      // Si hay categoryId, obtener productos por categoría
      request = this.productService.getProductsByCategory(+categoryId);
    } else {
      // Si no hay filtros, obtener todos los productos
      request = this.showActiveOnly 
        ? this.productService.getActiveProducts()
        : this.productService.getAllProducts();
    }

    request.subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los productos';
        this.loading = false;
        console.error('Error loading products:', error);
      }
    });
  }


  toggleActiveFilter() {
    this.showActiveOnly = !this.showActiveOnly;
    this.loadProducts();
  }

  deleteProduct(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (error) => {
          this.error = 'Error al eliminar el producto';
          console.error('Error deleting product:', error);
        }
      });
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  }
}
