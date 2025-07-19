import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Event } from '../../model/event.model';
import { Pageable } from '../../model/pageable.model';
import { SearchEventDTO } from '../dto/search-event-dto.model';

@Injectable({
  providedIn: 'root',
})
export class EventApiService {
  private readonly apiUrl = environment.apiUrl + '/event';

  constructor(private http: HttpClient) {}

  findAll(params?: HttpParams) {
    return this.http.get<{ content: Event[]; pageable: any }>(
      `${this.apiUrl}/find`, { params }
    );
  }
}
