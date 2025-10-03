import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email = '';
  password = '';
  error = '';
  private auth = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.auth.login(this.email, this.password).subscribe({
      next: res => {
        this.auth.saveToken(res.access_token);
        this.router.navigate(['/home']);
      },
      error: () => this.error = 'Credenciales inválidas'
    });
  }
}
