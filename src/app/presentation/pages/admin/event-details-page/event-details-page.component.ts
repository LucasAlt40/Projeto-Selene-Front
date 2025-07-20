import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { DatePipe } from '@angular/common';
import { EventApiService } from '../../../../core/api/services/event.api.service';

@Component({
  selector: 'app-event-details-page',
  imports: [DatePipe, SkeletonModule],
  templateUrl: './event-details-page.component.html',
})
export class EventDetailsPageComponent {
  id!: string;
  event: any;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventApiService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    //this.getEvent();
  }

  /* getEvent(): void {
    this.loading = true;
    this.eventService.findById(this.id).subscribe({
      next: (res) => {
        this.event = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Não foi possível carregar os dados do evento.';
        this.loading = false;
      },
    });
  } */
}
