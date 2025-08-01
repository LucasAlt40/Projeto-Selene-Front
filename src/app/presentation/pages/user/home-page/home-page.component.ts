import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { EventApiService } from '../../../../core/api/services/event.api.service';
import { Event } from '../../../../core/model/event.model';
import { ListEvent } from '../../../components/list-event/list-event.component';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
  selector: 'app-home-page',
  imports: [CarouselModule, RouterModule, ListEvent, SkeletonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  responsiveOptions: any[] | undefined;
  imagesBaseUrl: string = environment.imagesBaseUrl;

  categories = signal<any[]>([]);
  loading: boolean = true;

  categorizedEvents: WritableSignal<{ category: string; events: Event[] }[]> =
    signal([]);

  constructor(private eventService: EventApiService) {}

  ngOnInit() {
    this.loadCategories();

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
  private loadCategories() {
    this.eventService.getAllEventCategories().subscribe((response) => {
      this.categories.set(response.content);
      this.loadCategorizedEvents();
    });
  }

  private loadCategorizedEvents() {
    this.categories().forEach((category) => {
      const params = new HttpParams()
        .set('page', '0')
        .set('pageSize', '4')
        .set('categoryId', category.id.toString());

      this.eventService.findAll(params).subscribe({
        next: (response) => {
          const filtered = response.content.filter(
            (event) => event.previewImageUrl
          );

          this.categorizedEvents.update((current) => [
            ...current,
            {
              category: category.name,
              events: filtered,
            },
          ]);
        },
        complete: () => {
          this.loading = false;
        },
      });
    });
  }
}
