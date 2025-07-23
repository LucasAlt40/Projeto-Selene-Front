import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TicketResponseDto } from '../../model/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketApiService {
  private readonly apiUrl = environment.apiUrl + '/ticket';

  constructor(private http: HttpClient) {}

  public getTicketsByCustomer(customerId: number, eventId: number) {
    return this.http.get<TicketResponseDto[]>(
      `${this.apiUrl}/customer/${customerId}/event/${eventId}`
    );
  }
}
