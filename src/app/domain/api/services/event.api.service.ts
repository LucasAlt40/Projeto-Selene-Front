import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Event } from '../../model/event.model';
import { Observable } from 'rxjs';


type AddressRequestDto = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

type EventRequestDto = {
  title: string;
  description: string;
  date: string;       
  address: AddressRequestDto;
};

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

  public getEvents(): Observable<EventRequestDto[]> {
    return this.http.get<EventRequestDto[]>(`${this.apiUrl}/find`);
  }

  public createEvent(event: EventRequestDto, file: File): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add`, this.mappingEventRequest(event, file));
  }

  public updateEvent(idEvent: number, event: EventRequestDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${idEvent}`, event);
  }

  private mappingEventRequest(event: EventRequestDto, file: File){
    const formData = new FormData()

    formData.append("event.title", event.title)
    formData.append("event.description", event.description)
    formData.append("event.date", event.date)
    formData.append("event.address.street", event.address.street)
    formData.append("event.address.city", event.address.city)
    formData.append("event.address.state", event.address.state)
    formData.append("event.address.zipCode", event.address.zipCode)
    formData.append("file", file)

    return formData
  }
 
}
