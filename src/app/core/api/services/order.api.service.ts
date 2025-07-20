import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  CreateOrderRequestDTO,
  ResponseOrderDTO,
} from '../../model/order.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderApiService {
  private readonly apiUrl = environment.apiUrl + '/order';

  constructor(private http: HttpClient) {}

  public createOrder(order: CreateOrderRequestDTO) {
    return this.http.post<ResponseOrderDTO>(`${this.apiUrl}`, order);
  }
}
