import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModules } from './material.module';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ...MaterialModules],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  currentRoute: string = '';

  constructor(private router: Router) {
    // Escuchar cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  isAdminRoute(): boolean {
    return this.currentRoute.startsWith('/admin');
  }
}
