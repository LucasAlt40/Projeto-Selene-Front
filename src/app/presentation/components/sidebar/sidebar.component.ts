import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  imports: [PanelMenuModule, CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
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
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
