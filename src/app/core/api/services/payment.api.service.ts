import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LinkResponse, RequestCheckout } from '../../model/payment.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentApiService {
  private readonly apiUrl = environment.apiUrl + '/checkout';

  constructor(private http: HttpClient) {}

  public sendCheckout(
    requestCheckout: RequestCheckout
  ): Observable<LinkResponse> {
    return this.http.post<LinkResponse>(`${this.apiUrl}/new`, requestCheckout);
  }
}
