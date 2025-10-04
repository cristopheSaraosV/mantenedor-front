import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-landing',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule
  ],
  templateUrl: './home-landing.html',
  styleUrl: './home-landing.scss'
})
export class HomeLanding {
  productos = [
    {
      nombre: 'Cámaras Portátiles',
      descripcion: 'Cámaras infrarrojas portátiles para inspección industrial',
      img: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Portátiles'
    },
    {
      nombre: 'Cámaras Fijas',
      descripcion: 'Sistemas de monitoreo continuo para instalaciones industriales',
      img: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Fijas'
    },
    {
      nombre: 'Cámaras para Dron',
      descripcion: 'Sistemas especializados para inspección aérea',
      img: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Dron'
    },
    {
      nombre: 'Accesorios',
      descripcion: 'Lentes, filtros y accesorios para cámaras infrarrojas',
      img: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Accesorios'
    }
  ];

  constructor(private router: Router) {}

  goToAdmin() {
    this.router.navigate(['/admin/login']);
  }
}
