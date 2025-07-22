import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthApiService } from '../api/services/auth.api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authApi: AuthApiService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  public authenticateUser(email: string, password: string) {
    return this.authApi.login(email, password).pipe(
      tap(res => {
        const { token, expiresIn, user } = res;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);

        if (token && expiresIn) {
          this.cookieService.set('auth_token', token, expireDate);
        }

        if (user) {
          this.cookieService.set('auth_user', JSON.stringify(user), expireDate);
        }

        // Redireciona com base no tipo de usuário
        if (user?.isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/event']);
        }
      })
    ).subscribe();
  }

  public logout() {
    this.cookieService.delete('auth_token');
    this.cookieService.delete('auth_user');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return this.cookieService.check('auth_token') && this.cookieService.check('auth_user');
  }

  public getUser() {
    const userJson = this.cookieService.get('auth_user');
    return userJson ? JSON.parse(userJson) as { id: number, name: string, isAdmin: boolean } : null;
  }

  public isAdmin(): boolean {
    const user = this.getUser();
    return user?.isAdmin ?? false;
  }
}
