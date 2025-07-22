import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../../core/services/auth.service';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuModule, ButtonModule, RouterModule],
  templateUrl: './header.component.html',
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
