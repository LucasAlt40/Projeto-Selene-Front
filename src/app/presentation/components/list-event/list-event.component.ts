import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Event } from '../../../core/model/event.model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-list-event',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule],
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css'],
})
export class ListEvent {
  @Input() event!: Event;
  @Input() imagesBaseUrl!: string;
}
