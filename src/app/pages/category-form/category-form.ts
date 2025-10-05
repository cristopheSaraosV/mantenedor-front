import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, Category } from '../../services/product.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  categoryForm!: FormGroup;
  isEditMode = false;
  categoryId: number | null = null;
  loading = false;
  error: string | null = null;

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/admin/login']);
      return;
    }

    this.initForm();
    this.checkEditMode();
  }

  private initForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      icon: [''],
      isActive: [true],
      sortOrder: [0]
    });
  }

  private checkEditMode() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.categoryId = +id;
      this.loadCategory();
    }
  }

  private loadCategory() {
    if (this.categoryId) {
      this.loading = true;
      this.productService.getCategoryById(this.categoryId).subscribe({
        next: (category) => {
          this.categoryForm.patchValue(category);
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error al cargar la categoría';
          this.loading = false;
          console.error('Error loading category:', error);
        }
      });
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.loading = true;
      this.error = null;

      const formValue = this.categoryForm.value;
      const categoryData = {
        ...formValue,
        sortOrder: +formValue.sortOrder || 0 // Convertir a número
      };

      const request = this.isEditMode && this.categoryId
        ? this.productService.updateCategory(this.categoryId, categoryData)
        : this.productService.createCategory(categoryData);

      request.subscribe({
        next: (category) => {
          this.loading = false;
          this.router.navigate(['/admin/categories']);
        },
        error: (error) => {
          this.error = this.isEditMode 
            ? 'Error al actualizar la categoría' 
            : 'Error al crear la categoría';
          this.loading = false;
          console.error('Error saving category:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.categoryForm.controls).forEach(key => {
      const control = this.categoryForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel() {
    this.router.navigate(['/admin/categories']);
  }

  getFieldError(fieldName: string): string {
    const field = this.categoryForm.get(fieldName);
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
      icon: 'Icono',
      sortOrder: 'Orden'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.categoryForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }
}
