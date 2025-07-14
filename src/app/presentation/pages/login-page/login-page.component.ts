import { Component } from '@angular/core';
import { AuthApiService } from '../../../domain/api/services/auth.api.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, ReactiveFormsModule],
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
        this.cookieService.set('auth_token', res.token);
      },
      complete: () => {
        this.router.navigate(['/payment']);
      },
    });
  }
}
