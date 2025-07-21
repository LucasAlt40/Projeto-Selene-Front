import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { EventApiService } from '../../../../core/api/services/event.api.service';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

import { ToastModule } from 'primeng/toast';            
import { MessageService } from 'primeng/api';          

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
    ToastModule,  
  ],
  providers: [MessageService],  
  templateUrl: './add-ticket-category-page.component.html',
})
export class AddTicketCategoryPageComponent {
  ticketCategoryDescription = '';
  ticketCategoryQuantity: number | null = null;
  ticketCategoryPrice: number | null = null;
  selectedEventId: number | null = null;
  events: { id: number; title: string }[] = [];

  constructor(
    private eventService: EventApiService,
    private router: Router,
    private messageService: MessageService     
  ) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe({
      next: (res) => {
        this.events = res.content.map((event: any) => ({
          id: event.id,
          title: event.title,
        }));
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar eventos',
          life: 5000,
        });
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
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos!',
        life: 5000,
      });
      return;
    }

    this.eventService
      .createTicketCategory({
        eventId: this.selectedEventId,
        ticketCategoryDescription: this.ticketCategoryDescription,
        ticketCategoryQuantity: this.ticketCategoryQuantity,
        ticketCategoryPrice: this.ticketCategoryPrice,
      })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Categoria de ingresso criada com sucesso!',
            life: 5000,
          });
          this.router.navigate(['/admin/categorias-evento']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao criar categoria de ingresso!',
            life: 5000,
          });
        },
      });
  }
}
