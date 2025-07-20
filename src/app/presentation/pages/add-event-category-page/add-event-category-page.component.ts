import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { EventApiService } from '../../../core/api/services/event.api.service';

@Component({
  selector: 'app-add-event-category-page',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './add-event-category-page.component.html',
  styleUrls: ['./add-event-category-page.component.css']
})
export class AddEventCategoryPageComponent {
  categoryName: string = '';

  constructor(
    private eventService: EventApiService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.categoryName.trim()) {
      alert('O nome da categoria é obrigatório.');
      return;
    }

    this.eventService.createEventCategory({ name: this.categoryName }).subscribe({
      next: () => {
        alert('Categoria criada com sucesso!');
        this.router.navigate(['/admin/categorias-evento']);
      },
      error: (err) => {
        console.error('Erro ao criar categoria:', err);
        alert('Erro ao criar categoria.');
      },
    });
  }
}
