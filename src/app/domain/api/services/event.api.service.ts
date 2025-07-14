import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Event } from '../../model/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventApiService {
  private readonly apiUrl = environment.apiUrl + '/event';

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<{ content: Event[]; pageable: any }>(
      `${this.apiUrl}/find`
    );
  }
}
