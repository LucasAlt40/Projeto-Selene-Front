import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { EventApiService } from '../../../domain/api/services/event.api.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  imports: [CarouselModule, RouterModule, IconFieldModule, InputIconModule, InputText],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit{

  constructor(private eventService: EventApiService) {}

  ngOnInit() {
    const params = new HttpParams().set('page', '0').set('size', '10');

    this.eventService.findAll(params).subscribe(events => {
      console.log(events);
    });
  }
}
