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
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { AuthApiService } from '../../../../core/api/services/auth.api.service';
import { DocumentValidators } from '../../../../core/validators/Document.validator';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

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
    IftaLabelModule,
    CommonModule,
  ],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  constructor(
    private authApiService: AuthApiService,
    private authService: AuthService,
    private fb: FormBuilder
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

      this.authApiService.register(formValues).subscribe({
        next: () => {
          this.authService.authenticateUser(
            formValues.email,
            formValues.password
          );
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
