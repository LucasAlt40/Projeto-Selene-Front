import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type TicketCategoryResponseDto = {
  id: number;
  price: number;
  description: string;
  quantityAvaliable: number;
};

type TicketCategoryRequestDto = {
  price: number;
  description: string;
  quantity: number;
};

@Injectable({
  providedIn: 'root',
})
export class TicketCategoryApiService {
  private readonly apiUrl = environment.apiUrl + '/ticket-category';

  constructor(private http: HttpClient) {}

  public getTicketCategories(): Observable<TicketCategoryResponseDto[]> {
    return this.http.get<TicketCategoryResponseDto[]>(`${this.apiUrl}/find`);
  }

  public createTicketCategory(ticket: TicketCategoryRequestDto) {
    return this.http.post<void>(`${this.apiUrl}/create`, ticket);
  }

  public updateTicketCategory(
    idTicket: number,
    ticket: TicketCategoryRequestDto
  ) {
    return this.http.put<void>(`${this.apiUrl}/update/${idTicket}`, ticket);
  }
}
