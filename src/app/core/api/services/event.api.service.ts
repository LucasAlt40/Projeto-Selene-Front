import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Event, EventTicket } from '../../model/event.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type AddressRequestDto = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  number: number;
};

type EventRequestDto = {
  title: string;
  description: string;
  date: string;
  address: AddressRequestDto;
  categoryId: number;
  eventCategoryId: number;
};

type Category = {
  id: number;
  name: string;
};

type TicketCategoryRequestDto = {
  ticketCategoryDescription: string;
  ticketCategoryQuantity: number;
  ticketCategoryPrice: number;
  eventId: number;
};

type CategoryRequestDto = {
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class EventApiService {
  private readonly apiUrl = environment.apiUrl + '/event';

  constructor(private http: HttpClient) {}

  findAll(params?: HttpParams) {
    return this.http.get<{ content: Event[]; pageable: any }>(
      `${this.apiUrl}/find`,
      { params }
    );
  }

  public getAllEventCategories(): Observable<{ content: any; pageable: any }> {
    return this.http.get<{ content: any; pageable: any }>(
      `${this.apiUrl}/event-category/find`
    );
  }

  public getEvents(): Observable<{ content: EventRequestDto[] }> {
    return this.http.get<{ content: EventRequestDto[] }>(`${this.apiUrl}/find`);
  }

  public createEvent(event: any, file: File): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/add`,
      this.mappingEventRequest(event, file)
    );
  }

  public updateEvent(
    idEvent: number,
    event: EventRequestDto,
    file: File
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/update/${idEvent}`,
      this.mappingEventRequest(event, file)
    );
  }

  getCategories(): Observable<{ id: number; name: string }[]> {
    return this.http
      .get<{ content: { id: number; name: string }[] }>(
        `${environment.apiUrl}/event/event-category/find`
      )
      .pipe(map((res) => res.content));
  }

  public getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}/find`);
  }

  public getTicketTypesByEventId(id: number) {
    return this.http.get<EventTicket[]>(
      `${this.apiUrl}/${id}/ticket-category/find`
    );
  }

  public createEventCategory(category: CategoryRequestDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/event-category/add`, category);
  }

  public createTicketCategory(
    payload: TicketCategoryRequestDto
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/${payload.eventId}/ticket-category/add`,
      {
        description: payload.ticketCategoryDescription,
        quantity: payload.ticketCategoryQuantity,
        price: payload.ticketCategoryPrice,
      }
    );
  }

  private mappingEventRequest(event: EventRequestDto, file: File) {
    const formData = new FormData();

    formData.append('event.title', event.title);
    formData.append('event.description', event.description);
    formData.append('event.date', event.date);
    formData.append('event.address.street', event.address.street);
    formData.append('event.address.city', event.address.city);
    formData.append('event.address.state', event.address.state);
    formData.append('event.address.zipCode', event.address.zipCode);
    formData.append('event.address.number', event.address.number.toString());

    formData.append('file', file);
    formData.append('event.categoryId', event.categoryId.toString());

    return formData;
  }
}
