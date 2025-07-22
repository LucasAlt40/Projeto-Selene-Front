import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { EventApiService } from '../../../../core/api/services/event.api.service';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-event-category-page',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './add-event-category-page.component.html',
})
export class AddEventCategoryPageComponent {
  categoryName: string = '';

  constructor(
    private eventService: EventApiService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onSubmit() {
    if (!this.categoryName.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O nome da categoria é obrigatório.',
        life: 5000,
      });
      return;
    }

    this.eventService.createEventCategory({ name: this.categoryName }).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Categoria criada com sucesso!',
          life: 5000,
        });
        this.router.navigate(['/admin/categorias-evento']);
      },
      error: (err) => {
        console.error('Erro ao criar categoria:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar categoria.',
          life: 5000,
        });
      },
    });
  }
}
