import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';

import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../core/services/auth.service';
import { LogoComponent } from '../../../components/logo/logo.component';

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    ImageModule,
    LogoComponent,
  ],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  loading: boolean = false;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.authenticateUser(email, password).subscribe({
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
