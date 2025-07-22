import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../../core/services/auth.service';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isAuthenticated = false;
  user: any = null;
  items: MenuItem[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.user = this.authService.getUser();

    this.items = [
      {
        label: 'Meu pedidos',
        icon: 'pi pi-user-edit',
        command: () => this.router.navigate(['/pedidos']),
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
