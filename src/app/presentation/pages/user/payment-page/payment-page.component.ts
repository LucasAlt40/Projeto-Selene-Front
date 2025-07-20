import { Component } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { EventApiService } from '../../../../core/api/services/event.api.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { EventTicket } from '../../../../core/model/event.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-payment-page',
  imports: [StepperModule, ButtonModule, InputNumberModule, CurrencyPipe],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css',
})
export class PaymentPageComponent {
  tickets: EventTicket[] = [];

  constructor(
    private eventService: EventApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService
        .getTicketTypesByEventId(+eventId)
        .subscribe((tickets) => {
          // o price dos tickets está vindo como centavos
          this.tickets = tickets.map((ticket) => ({
            ...ticket,
            price: ticket.price / 100,
          }));
        });
    }
  }
}
