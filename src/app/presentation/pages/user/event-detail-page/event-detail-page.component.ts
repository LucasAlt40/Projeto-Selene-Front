import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventApiService } from '../../../../core/api/services/event.api.service';
import { Event } from '../../../../core/model/event.model';
import { environment } from '../../../../../environments/environment';
import { DatePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { HttpParams } from '@angular/common/http';
import { SkeletonModule } from 'primeng/skeleton';
import { ListEvent } from '../../../components/list-event/list-event.component';

@Component({
  selector: 'app-event-detail-page',
  imports: [DatePipe, TagModule, ButtonModule, RouterModule, SkeletonModule, ListEvent],
  templateUrl: './event-detail-page.component.html',
  styleUrl: './event-detail-page.component.css',
})
export class EventDetailPageComponent {
  eventsSuggested = signal<Event[]>([]);

  event!: Event;
  imagesBaseUrl: string = environment.imagesBaseUrl;
  loading = signal<boolean>(true);

  constructor(
    private route: ActivatedRoute,
    private eventService: EventApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const eventId = params['id'];
      if (eventId) {
        this.loading.set(true);
        this.eventService.getEventById(+eventId).subscribe({
          next: (event) => {
            this.event = event;
          },
          complete: () => {
            this.loadEvents(this.eventsSuggested);
          },
        });
      }
    });
  }

  private loadEvents(items: any) {
    const params = new HttpParams()
      .set('page', '0')
      .set('pageSize', '7')
      .set('categoryId', this.event.eventCategoryId.toString());

    this.eventService.findAll(params).subscribe({
      next: (events) => {
        items.set(
          events.content.filter(
            (event) => event.previewImageUrl && event.id !== this.event.id
          )
        );
      },
      error: () => {
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
