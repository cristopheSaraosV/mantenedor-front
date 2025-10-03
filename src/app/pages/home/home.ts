import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private auth = inject(AuthService);


  logout() {
    this.auth.logout();
  }
}
