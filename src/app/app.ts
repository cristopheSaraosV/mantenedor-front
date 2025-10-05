import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModules } from './material.module';
import { filter,  takeUntil } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ...MaterialModules],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  currentRoute: string = '';
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {
    // Escuchar cambios de ruta
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  ngOnInit() {
    // Verificar el estado inicial de autenticación
    this.checkAuthState();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkAuthState() {
    // Si no está autenticado y está en una ruta protegida, redirigir al login
    if (!this.authService.isLoggedIn() && this.currentRoute.startsWith('/admin') && this.currentRoute !== '/admin/login') {
      this.router.navigate(['/admin/login']);
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  isAdminRoute(): boolean {
    return this.currentRoute.startsWith('/admin') && 
           this.currentRoute !== '/admin/login' && 
           this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
