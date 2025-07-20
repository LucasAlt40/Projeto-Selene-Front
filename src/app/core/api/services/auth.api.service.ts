import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type RegisterRequest = {
  email: string;
  password: string;
  document: string;
  name: string;
  phone: string;
};
@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly apiUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  public login(email: string, password: string) {
    return this.http.post<{
      token: string;
      expiresIn: number;
      user: {
        id: string;
        name: string;
      };
    }>(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }

  public register(registerRequest: RegisterRequest) {
    return this.http.post<void>(`${this.apiUrl}/signup`, registerRequest);
  }
}
