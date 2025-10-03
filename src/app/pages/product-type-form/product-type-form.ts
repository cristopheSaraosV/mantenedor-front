import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, ProductType, Category } from '../../services/product.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-product-type-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-type-form.html',
  styleUrl: './product-type-form.scss'
})
export class ProductTypeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  productTypeForm!: FormGroup;
  isEditMode = false;
  productTypeId: number | null = null;
  loading = false;
  error: string | null = null;
  categories: Category[] = [];
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
    this.productTypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      specifications: [''],
      isActive: [true],
      sortOrder: [0],
      categoryId: [null, [Validators.required]]
    });
  }

  private loadCategories() {
    this.loadingCategories = true;
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loadingCategories = false;
        
        // Si hay un categoryId en la URL, seleccionarlo automáticamente
        const categoryId = this.route.snapshot.queryParams['categoryId'];
        if (categoryId) {
          this.productTypeForm.patchValue({ categoryId: +categoryId });
        }
      },
      error: (error) => {
        this.error = 'Error al cargar las categorías';
        this.loadingCategories = false;
        console.error('Error loading categories:', error);
      }
    });
  }

  private checkEditMode() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productTypeId = +id;
      this.loadProductType();
    }
  }

  private loadProductType() {
    if (this.productTypeId) {
      this.loading = true;
      this.productService.getProductTypeById(this.productTypeId).subscribe({
        next: (productType) => {
          this.productTypeForm.patchValue(productType);
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error al cargar el tipo de producto';
          this.loading = false;
          console.error('Error loading product type:', error);
        }
      });
    }
  }

  onSubmit() {
    if (this.productTypeForm.valid) {
      this.loading = true;
      this.error = null;

      const formValue = this.productTypeForm.value;
      const productTypeData = {
        ...formValue,
        categoryId: +formValue.categoryId, // Convertir a número
        sortOrder: +formValue.sortOrder || 0 // Convertir a número
      };

      const request = this.isEditMode && this.productTypeId
        ? this.productService.updateProductType(this.productTypeId, productTypeData)
        : this.productService.createProductType(productTypeData);

      request.subscribe({
        next: (productType) => {
          this.loading = false;
          this.router.navigate(['/product-types', 'category', productType.categoryId]);
        },
        error: (error) => {
          this.error = this.isEditMode 
            ? 'Error al actualizar el tipo de producto' 
            : 'Error al crear el tipo de producto';
          this.loading = false;
          console.error('Error saving product type:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.productTypeForm.controls).forEach(key => {
      const control = this.productTypeForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel() {
    const categoryId = this.productTypeForm.get('categoryId')?.value;
    if (categoryId) {
      this.router.navigate(['/product-types', 'category', categoryId]);
    } else {
      this.router.navigate(['/categories']);
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.productTypeForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} es requerido`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Nombre',
      description: 'Descripción',
      specifications: 'Especificaciones',
      categoryId: 'Categoría',
      sortOrder: 'Orden'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productTypeForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }
}
