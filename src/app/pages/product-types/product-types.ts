import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService, ProductType, Category } from '../../services/product.service';
import { AuthService } from '../../auth.service';
import { MaterialModules } from '../../material.module';

@Component({
  selector: 'app-product-types',
  standalone: true,
  imports: [CommonModule, RouterModule, ...MaterialModules],
  templateUrl: './product-types.html',
  styleUrl: './product-types.scss'
})
export class ProductTypesComponent implements OnInit {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  productTypes: ProductType[] = [];
  category: Category | null = null;
  loading = true;
  error: string | null = null;
  categoryId: number | null = null;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'] ? +params['categoryId'] : null;
      this.loadProductTypes();
    });
  }

  loadProductTypes() {
    this.loading = true;
    this.error = null;

    const request = this.categoryId 
      ? this.productService.getProductTypesByCategory(this.categoryId)
      : this.productService.getProductTypes();

    request.subscribe({
      next: (productTypes) => {
        this.productTypes = productTypes;
        if (this.categoryId && productTypes.length > 0) {
          this.category = productTypes[0].category || null;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los tipos de productos';
        this.loading = false;
        console.error('Error loading product types:', error);
      }
    });
  }

  deleteProductType(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este tipo de producto? Esto también eliminará todos los productos asociados.')) {
      this.productService.deleteProductType(id).subscribe({
        next: () => {
          this.loadProductTypes();
        },
        error: (error) => {
          this.error = 'Error al eliminar el tipo de producto';
          console.error('Error deleting product type:', error);
        }
      });
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getProductsCount(productType: ProductType): number {
    return productType.products?.length || 0;
  }

  getPageTitle(): string {
    if (this.category) {
      return `Tipos de Productos - ${this.category.name}`;
    }
    return 'Gestión de Tipos de Productos';
  }
}
