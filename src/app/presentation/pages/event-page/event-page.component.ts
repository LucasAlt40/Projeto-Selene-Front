import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { EventApiService } from '../../../domain/api/services/event.api.service';
import { Event } from '../../../domain/model/event.model';

@Component({
  selector: 'app-event-page',
  imports: [TableModule],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css',
})
export class EventPageComponent {
  events: Event[] = [];

  constructor(private eventService: EventApiService) {}

  ngOnInit() {
    this.eventService.findAll().subscribe((res) => {
      this.events = res.content;
    });
  }
}
