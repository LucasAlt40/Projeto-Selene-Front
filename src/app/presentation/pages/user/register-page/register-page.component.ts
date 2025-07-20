import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CookieService } from 'ngx-cookie-service';
import { InputMaskModule } from 'primeng/inputmask';
import { AuthApiService } from '../../../../core/api/services/auth.api.service';
import { DocumentValidators } from '../../../../core/validators/Document.validator';

@Component({
  selector: 'app-register-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    InputMaskModule,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  constructor(
    private authService: AuthApiService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', { validators: [Validators.required, Validators.email] }],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        document: [
          '',
          {
            validators: [Validators.required, DocumentValidators.validCPF()],
          },
        ],
        name: ['', Validators.required],
        phone: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator() }
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValues = { ...this.registerForm.value };

      if (formValues.document) {
        formValues.document = formValues.document.replace(/\D/g, '');
      }

      if (formValues.phone) {
        formValues.phone = formValues.phone.replace(/\D/g, '');
      }

      this.authService.register(formValues).subscribe({
        next: () => {
          this.authService
            .login(formValues.email, formValues.password)
            .subscribe({
              next: (res) => {
                const token = res.token;
                const expiresIn = res.expiresIn;

                if (token && expiresIn) {
                  const expireDate = new Date(
                    new Date().getTime() + expiresIn * 1000
                  );
                  this.cookieService.set('auth_token', token, expireDate);
                }
              },
              complete: () => {
                this.router.navigate(['/eventos']);
              },
            });
        },
        error: (err) => {
          console.error('Registration failed', err);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }
}
