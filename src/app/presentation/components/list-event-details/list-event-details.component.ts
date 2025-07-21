import { Component, Input, signal } from '@angular/core';
import { Event } from '../../../core/model/event.model';
import { RouterLink } from '@angular/router';
import { EventApiService } from '../../../core/api/services/event.api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-event-details',
  imports: [RouterLink, DatePipe],
  templateUrl: './list-event-details.component.html',
  styleUrl: './list-event-details.component.css',
})
export class ListEventDetails {
  @Input() event!: Event;
  @Input() imagesBaseUrl!: string;
}
