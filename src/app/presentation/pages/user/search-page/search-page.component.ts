import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListEventDetails } from '../../../components/list-event-details/list-event-details.component';
import { EventApiService } from '../../../../core/api/services/event.api.service';
import { Event } from '../../../../core/model/event.model';
import { environment } from '../../../../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ListEventDetails],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent {
  events = signal<Event[]>([]);
  categories = signal<{ id: number; name: string }[]>([]);
  selectedCategoryId = signal<number>(0);
  imagesBaseUrl: string = environment.imagesBaseUrl;

  constructor(private eventService: EventApiService) {}

  ngOnInit() {
    this.loadSearch();
    this.loadCategories();
  }

  private loadSearch() {
    this.eventService
      .findAll(new HttpParams().set('pageSize', 2000))
      .subscribe((response) => {
        this.events.set(response.content);
      });
  }

  private loadCategories() {
    this.eventService.getCategories().subscribe((response) => {
      this.categories.set(response);
    });
  }

  searchTerm = '';

  filterEvents() {
    let params = new HttpParams().set('title', this.searchTerm).set('pageSize', 2000);
    if (this.selectedCategoryId()) {
      params = params.set('categoryId', this.selectedCategoryId());
    }
    this.eventService
      .findAll(params)
      .subscribe((response) => {
        this.events.set(response.content);
      });
  }

  setCategory(categoryId: number) {
    this.selectedCategoryId.set(categoryId);
    this.filterEvents();
  }
}
