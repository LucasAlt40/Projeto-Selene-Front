import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpParams } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EventApiService } from '../../../../core/api/services/event.api.service';

@Component({
  selector: 'app-event-category-page',
  standalone: true,
  imports: [TableModule, ButtonModule, RouterModule],
  templateUrl: './event-category-page.component.html',
})
export class EventCategoryPageComponent {
  categories: { id: number; name: string }[] = [];
  totalRecords = 0;
  loading = false;

  constructor(private eventService: EventApiService) {}

  ngOnInit() {
    this.loading = true;
  }

  loadCategories(event: any) {
    this.loading = true;

    const page = (event.first ?? 0) / (event.rows ?? 10);
    const pageSize = event.rows ?? 10;

    const params = new HttpParams()
      .set('page', page + 1)
      .set('pageSize', pageSize);

    this.eventService.getAllEventCategories().subscribe({
      next: (res) => {
        this.categories = res.content;
        this.totalRecords = res.pageable?.total || res.content.length;
        this.loading = false;
      },
      error: () => {
        this.categories = [];
        this.totalRecords = 0;
        this.loading = false;
      },
    });
  }
}
