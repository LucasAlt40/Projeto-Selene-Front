import { Component, Input, signal } from '@angular/core';
import { Event } from '../../../core/model/event.model';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DatePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-event-details',
  imports: [RouterLink, DatePipe, CardModule, TagModule, ButtonModule],
  templateUrl: './list-event-details.component.html',
  styleUrl: './list-event-details.component.css',
})
export class ListEventDetails {
  @Input() event!: Event;
  @Input() imagesBaseUrl!: string;
}
