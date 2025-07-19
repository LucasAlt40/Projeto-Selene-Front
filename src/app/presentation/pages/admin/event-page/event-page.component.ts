import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpParams } from '@angular/common/http';
import { EventApiService } from '../../../../domain/api/services/event.api.service';
import { Event } from '../../../../domain/model/event.model';

@Component({
  selector: 'app-event-page',
  imports: [TableModule, ButtonModule],
  templateUrl: './event-page.component.html',
})
export class EventPageComponent {
  events: Event[] = [];
  totalRecords = 0;
  loading = false;

  constructor(private eventService: EventApiService) {}

  ngOnInit() {
    this.loading = true;
  }

  loadEvents(event: any) {
    this.loading = true;

    const page = (event.first ?? 0) / (event.rows ?? 10);
    const pageSize = event.rows ?? 10;

    const params = new HttpParams()
      .set('page', page + 1)
      .set('pageSize', pageSize);

    this.eventService.findAll(params).subscribe({
      next: (res) => {
        console.log(res);

        this.events = res.content;
        this.totalRecords = res.pageable.total;
        this.loading = false;
      },
      error: () => {
        this.events = [];
        this.totalRecords = 0;
        this.loading = false;
      },
    });
  }
}
