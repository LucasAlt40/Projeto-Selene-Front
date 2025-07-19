import { Component } from '@angular/core';
import { AuthApiService } from '../../../domain/api/services/auth.api.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

import { CookieService } from 'ngx-cookie-service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthApiService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        const token = res.token;
        const expiresIn = res.expiresIn;

        if (token && expiresIn) {
          const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
          this.cookieService.set('auth_token', token, expireDate);
        }
      },
      complete: () => {
        this.router.navigate(['/event']);
      },
    });
  }
}
