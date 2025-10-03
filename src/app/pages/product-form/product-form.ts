import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, Product, Category, ProductType } from '../../services/product.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  productForm!: FormGroup;
  isEditMode = false;
  productId: number | null = null;
  loading = false;
  error: string | null = null;
  categories: Category[] = [];
  productTypes: ProductType[] = [];
  loadingCategories = false;

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.initForm();
    this.loadCategories();
    this.checkEditMode();
  }

  private initForm() {
    this.productForm = this.fb.group({
      model: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      price: [0, [Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      brand: [''],
      country: [''],
      technicalSpecs: [''],
      imageUrl: [''],
      isActive: [true],
      sortOrder: [0],
      productTypeId: [null, [Validators.required]]
    });
  }

  private loadCategories() {
    this.loadingCategories = true;
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loadingCategories = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las categorías';
        this.loadingCategories = false;
        console.error('Error loading categories:', error);
      }
    });
  }

  onCategoryChange(categoryId: string | number) {
    const id = typeof categoryId === 'string' ? +categoryId : categoryId;
    
    if (id && id > 0) {
      this.productService.getProductTypesByCategory(id).subscribe({
        next: (productTypes) => {
          this.productTypes = productTypes;
          // Reset productTypeId when category changes
          this.productForm.patchValue({ productTypeId: null });
        },
        error: (error) => {
          this.error = 'Error al cargar los tipos de productos';
          console.error('Error loading product types:', error);
        }
      });
    } else {
      this.productTypes = [];
      this.productForm.patchValue({ productTypeId: null });
    }
  }

  getSelectedCategoryId(): number | null {
    // This method would need to be implemented based on how you want to handle category selection
    // For now, we'll get it from the first product type's category
    return this.productTypes.length > 0 ? this.productTypes[0].categoryId : null;
  }

  private checkEditMode() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = +id;
      this.loadProduct();
    }
  }

  private loadProduct() {
    if (this.productId) {
      this.loading = true;
      this.productService.getProductById(this.productId).subscribe({
        next: (product) => {
          this.productForm.patchValue(product);
          
          // Load product types for the selected category
          if (product.productType?.categoryId) {
            this.onCategoryChange(product.productType.categoryId);
          }
          
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error al cargar el producto';
          this.loading = false;
          console.error('Error loading product:', error);
        }
      });
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.loading = true;
      this.error = null;

      const formValue = this.productForm.value;
      const productData = {
        ...formValue,
        productTypeId: +formValue.productTypeId, // Convertir a número
        price: formValue.price ? +formValue.price : null, // Convertir a número o null
        stock: +formValue.stock, // Convertir a número
        sortOrder: +formValue.sortOrder || 0 // Convertir a número
      };

      const request = this.isEditMode && this.productId
        ? this.productService.updateProduct(this.productId, productData)
        : this.productService.createProduct(productData);

      request.subscribe({
        next: (product) => {
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.error = this.isEditMode 
            ? 'Error al actualizar el producto' 
            : 'Error al crear el producto';
          this.loading = false;
          console.error('Error saving product:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel() {
    this.router.navigate(['/products']);
  }

  getFieldError(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} es requerido`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['min']) {
        return `${this.getFieldLabel(fieldName)} debe ser mayor o igual a ${field.errors['min'].min}`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      model: 'Modelo',
      description: 'Descripción',
      price: 'Precio',
      stock: 'Stock',
      brand: 'Marca',
      country: 'País',
      technicalSpecs: 'Especificaciones Técnicas',
      imageUrl: 'URL de imagen',
      productTypeId: 'Tipo de Producto',
      sortOrder: 'Orden'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }
}
