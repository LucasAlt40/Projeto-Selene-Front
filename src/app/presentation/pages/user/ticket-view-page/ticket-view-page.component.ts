import { Component } from '@angular/core';
import { TicketApiService } from '../../../../core/api/services/ticket.api.service';
import { TicketResponseDto } from '../../../../core/model/ticket.model';
import { ActivatedRoute } from '@angular/router';
import { TicketPreviewComponent } from '../../../components/user/ticket-preview/ticket-preview.component';

@Component({
  selector: 'app-ticket-view-page',
  imports: [TicketPreviewComponent],
  templateUrl: './ticket-view-page.component.html',
})
export class TicketViewPageComponent {
  tickets!: TicketResponseDto[];

  constructor(
    private ticketService: TicketApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const customerId = this.route.snapshot.paramMap.get('customerId')!;

    this.ticketService
      .getTicketsByCustomer(+customerId)
      .subscribe((res) => (this.tickets = res));
  }
}
