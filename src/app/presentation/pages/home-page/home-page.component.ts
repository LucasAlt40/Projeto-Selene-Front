import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { EventApiService } from '../../../domain/api/services/event.api.service';
import { HttpParams } from '@angular/common/http';
import { Event } from '../../../domain/model/event.model';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Button } from "primeng/button";

@Component({
  selector: 'app-home-page',
  imports: [
    CarouselModule,
    RouterModule,
    IconFieldModule,
    InputIconModule,
    InputText,
    DatePipe,
    Button
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  eventsHighlighted: Event[] = [];
  responsiveOptions: any[] | undefined;
  imagesBaseUrl: string = environment.imagesBaseUrl;

  constructor(private eventService: EventApiService) {}

  ngOnInit() {
    const params = new HttpParams().set('page', '0').set('size', '5');

    this.eventService.findAll(params).subscribe((events) => {
      this.eventsHighlighted = events.content.filter(
        (event) => event.previewImageUrl
      );
    });

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
}
