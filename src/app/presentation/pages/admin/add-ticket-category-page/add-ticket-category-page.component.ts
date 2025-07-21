import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventApiService } from '../../../../core/api/services/event.api.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-add-ticket-category-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './add-ticket-category-page.component.html',
})
export class AddTicketCategoryPageComponent {
  ticketCategoryDescription = '';
  ticketCategoryQuantity: number | null = null;
  ticketCategoryPrice: number | null = null;
  selectedEventId: number | null = null;
  events: { id: number; title: string }[] = [];

  constructor(private eventService: EventApiService, private router: Router) {}

  ngOnInit() {
    const params = new HttpParams().set('pageSize', 200);

    this.eventService.findAll(params).subscribe({
      next: (res) => {
        this.events = res.content.map((event: any) => ({
          id: (event as any).id,
          title: (event as any).title,
        }));
      },
      error: () => {
        console.error('Erro ao carregar eventos');
      },
    });
  }

  onSubmit() {
    if (
      !this.selectedEventId ||
      !this.ticketCategoryDescription ||
      this.ticketCategoryQuantity === null ||
      this.ticketCategoryPrice === null
    ) {
      alert('Preencha todos os campos!');
      return;
    }

    this.eventService
      .createTicketCategory({
        eventId: this.selectedEventId,
        ticketCategoryDescription: this.ticketCategoryDescription,
        ticketCategoryQuantity: this.ticketCategoryQuantity,
        ticketCategoryPrice: this.ticketCategoryPrice * 100,
      })
      .subscribe({
        next: () => {
          alert('Categoria de ingresso criada com sucesso!');
          this.router.navigate(['/admin/categorias-evento']);
        },
        error: () => {
          alert('Erro ao criar categoria de ingresso!');
        },
      });
  }
}
