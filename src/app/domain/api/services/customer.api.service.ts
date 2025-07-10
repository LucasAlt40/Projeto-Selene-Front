import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService {
  private readonly apiUrl = environment.apiUrl + '/customer';

  constructor() {}
}
