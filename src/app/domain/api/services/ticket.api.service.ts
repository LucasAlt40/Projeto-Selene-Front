import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketApiService {
  private readonly apiUrl = environment.apiUrl + '/ticket';

  constructor() {}
}
