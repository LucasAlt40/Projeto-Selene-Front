import { Component } from '@angular/core';
import { TicketApiService } from '../../../../core/api/services/ticket.api.service';
import { TicketResponseDto } from '../../../../core/model/ticket.model';
import { ActivatedRoute } from '@angular/router';
import { TicketPreviewComponent } from '../../../components/user/ticket-preview/ticket-preview.component';
import { AuthService } from '../../../../core/services/auth.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-ticket-view-page',
  imports: [TicketPreviewComponent, SkeletonModule],
  templateUrl: './ticket-view-page.component.html',
})
export class TicketViewPageComponent {
  tickets!: TicketResponseDto[];
  loading: boolean = true;

  constructor(
    private ticketService: TicketApiService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('eventId')!;
    const user = this.authService.getUser()!;
    this.ticketService.getTicketsByCustomer(user.id, +eventId).subscribe({
      next: (res) => {
        this.tickets = res;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
