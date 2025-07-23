import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [PanelMenuModule, CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styles: `
    :host {
      position: fixed;
    }
  `,
})
export class SidebarComponent {
  isCollapsed = false;

  items: MenuItem[] = [
    {
      label: 'Eventos',
      icon: 'pi pi-calendar',
      routerLink: ['/admin/eventos'],
    },
    {
      label: 'Categoria de Evento',
      icon: 'pi pi-tags',
      routerLink: ['/admin/categorias-evento'],
    },
    {
      label: 'Categoria de Ingresso',
      icon: 'pi pi-ticket',
      routerLink: ['/admin/categorias-ingresso/criar'],
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      command: () => this.authService.logout(),
    },
  ];

  constructor(private authService: AuthService) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
