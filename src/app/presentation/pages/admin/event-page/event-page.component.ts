import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpParams } from '@angular/common/http';
import { EventApiService } from '../../../../core/api/services/event.api.service';
import { Event } from '../../../../core/model/event.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-page',
  imports: [TableModule, ButtonModule, RouterModule],
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
