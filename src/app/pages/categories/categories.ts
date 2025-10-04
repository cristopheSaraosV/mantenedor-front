import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Category } from '../../services/product.service';
import { AuthService } from '../../auth.service';
import { MaterialModules } from '../../material.module';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, ...MaterialModules],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class CategoriesComponent implements OnInit {
  private productService = inject(ProductService);
  private authService = inject(AuthService);

  categories: Category[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.error = null;

    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las categorías';
        this.loading = false;
        console.error('Error loading categories:', error);
      }
    });
  }

  deleteCategory(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría? Esto también eliminará todos los tipos de productos y productos asociados.')) {
      this.productService.deleteCategory(id).subscribe({
        next: () => {
          this.loadCategories();
        },
        error: (error) => {
          this.error = 'Error al eliminar la categoría';
          console.error('Error deleting category:', error);
        }
      });
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getProductTypesCount(category: Category): number {
    return category.productTypes?.length || 0;
  }
}
