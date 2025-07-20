import { Component, OnInit, signal, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Button } from 'primeng/button';
import { environment } from '../../../../../environments/environment';
import { EventApiService } from '../../../../core/api/services/event.api.service';
import { Event } from '../../../../core/model/event.model';

@Component({
  selector: 'app-home-page',
  imports: [CarouselModule, RouterModule, DatePipe, Button],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  eventsHighlighted = signal<Event[]>([]);
  responsiveOptions: any[] | undefined;
  imagesBaseUrl: string = environment.imagesBaseUrl;

  constructor(private eventService: EventApiService) {}

  ngOnInit() {
    this.loadEvents(1, this.eventsHighlighted);
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  private loadEvents(categoryId: number, items: any) {
    const params = new HttpParams()
      .set('page', '0')
      .set('size', '5')
      .set('categoryId', categoryId.toString());

    this.eventService.findAll(params).subscribe((events) => {
      items.set(events.content.filter((event) => event.previewImageUrl));
    });
  }
}
