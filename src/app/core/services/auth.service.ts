import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthApiService } from '../api/services/auth.api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authService: AuthApiService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  public authenticateUser(email: string, password: string) {
    this.authService.login(email, password).subscribe({
      next: (res) => {
        const token = res.token;
        const expiresIn = res.expiresIn;
        const user = res.user;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);

        if (user) {
          this.cookieService.set('auth_user', JSON.stringify(user), expireDate);
        }

        if (token && expiresIn) {
          this.cookieService.set('auth_token', token, expireDate);
        }
      },
      complete: () => {
        this.router.navigate(['/event']);
      },
    });
  }

  public logout() {
    this.cookieService.delete('auth_token');
    this.cookieService.delete('auth_user');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return (
      this.cookieService.check('auth_token') &&
      this.cookieService.check('auth_user')
    );
  }

  public getUser() {
    const user = this.cookieService.get('auth_user');
    return user ? JSON.parse(user) : null;
  }
}
