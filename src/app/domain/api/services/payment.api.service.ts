import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LinkResponse, RequestCheckout } from '../../model/payment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentApiService {
  private readonly apiUrl = 'http://10.242.157.144:8080/checkout';

  constructor(private http: HttpClient) {}

  public sendCheckout(
    requestCheckout: RequestCheckout
  ): Observable<LinkResponse> {
    return this.http.post<LinkResponse>(`${this.apiUrl}/new`, requestCheckout);
  }
}
