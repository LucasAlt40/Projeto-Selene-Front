import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

type ResponsiveOption = {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
};

type EventByCategory = {
  id: number;
  previewUrl: string;
  title: string;
  date: Date;
};

@Component({
  selector: 'app-event-carousel',
  imports: [CarouselModule],
  templateUrl: './event-carousel.component.html',
  styleUrl: './event-carousel.component.css',
})
export class EventCarouselComponent {
  @Input() responsiveOptions: ResponsiveOption[] = [];
  @Input() events: EventByCategory[] = [];
  @Input() labelCategory: string = '';
}
