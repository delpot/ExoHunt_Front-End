import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn: boolean = this.authService.isLoggedIn();
  menuActive = false;
  menuClicked = false;

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.clearToken();
    this.authService.clearUserId();
    this.isLoggedIn = false;
    this.router.navigate(['/login']).then(() => window.location.reload());
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
    this.menuClicked = true;
  }
}
