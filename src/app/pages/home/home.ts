import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { MaterialModules } from '../../material.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ...MaterialModules],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private auth = inject(AuthService);


  logout() {
    this.auth.logout();
  }
}
