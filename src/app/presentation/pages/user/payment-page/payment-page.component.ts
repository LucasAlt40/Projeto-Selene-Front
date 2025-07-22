import { Component, signal } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { EventApiService } from '../../../../core/api/services/event.api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { EventTicket } from '../../../../core/model/event.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { CurrencyPipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { OrderApiService } from '../../../../core/api/services/order.api.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-payment-page',
  imports: [
    StepperModule,
    ButtonModule,
    InputNumberModule,
    CurrencyPipe,
    TagModule,
    DividerModule,
    FormsModule,
  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css',
})
export class PaymentPageComponent {
  tickets: EventTicket[] = [];
  ticketQuantities: { [ticketId: number]: number } = {};
  loading = signal(false);

  selectedTickets: {
    id: number;
    quantity: number;
    price: number;
    description: string;
  }[] = [];
  eventId: string | null = '';

  constructor(
    private eventService: EventApiService,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.eventService
        .getTicketTypesByEventId(+this.eventId)
        .subscribe((tickets) => {
          this.tickets = tickets.map((ticket) => ({
            ...ticket,
            price: ticket.price / 100,
          }));
        });
    }
  }

  updateSelectedTickets(ticket: any, quantity: number) {
    const existing = this.selectedTickets.find((t) => t.id === ticket.id);
    if (quantity > 0) {
      if (existing) {
        existing.quantity = quantity;
      } else {
        this.selectedTickets.push({
          ...ticket,
          quantity,
        });
      }
    } else {
      this.selectedTickets = this.selectedTickets.filter(
        (t) => t.id !== ticket.id
      );
    }
  }

  get totalPrice() {
    return this.selectedTickets.reduce(
      (sum, t) => sum + t.quantity * t.price,
      0
    );
  }

  createOrder() {
    const customerId = this.authService.getUser()?.id;
    const tickets = this.selectedTickets.map((ticket) => ({
      eventId: +this.eventId!,
      categoryId: ticket.id,
      quantity: ticket.quantity,
    }));
    const order = {
      tickets,
      customerId,
    };
    this.loading.set(true);
    this.orderService.createOrder(order).subscribe({
      next: (response) => {
        window.open(response.checkout.links[0].href, '_blank');
      },
      error: () => {
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
        this.router.navigate(['/pedidos'])
      },
    });
  }
}
