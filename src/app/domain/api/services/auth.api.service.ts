import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly apiUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  public login(
    email: string,
    password: string
  ): Observable<{ token: string; expiresIn: number }> {
    return this.http.post<{ token: string; expiresIn: number }>(
      `${this.apiUrl}/login`,
      {
        email,
        password,
      }
    );
  }
}
