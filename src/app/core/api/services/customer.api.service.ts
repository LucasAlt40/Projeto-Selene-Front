import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService {
  private readonly apiUrl = environment.apiUrl + '/customer';

  constructor(private http: HttpClient) {}
}
