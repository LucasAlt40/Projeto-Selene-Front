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

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginForm: FormGroup;
  errorMessage: string = "";

  constructor(private authService: AuthApiService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['lucas.alt40@gmail.com'],
      password: ['@teste123'],
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      {
        next: (res) => {
          console.log("res", res);
          /* guardar nos cookies/local storage */

          this.router.navigate(["/payment"])
        },
        error: (err) => {
          console.error("errozão", err)
          this.errorMessage = "Falha ao tentar se logar!"
        },
        complete: () => {
          console.log("deu certo");
        }
      }
    );

    /* this.authService.login(email, password).subscribe((res) => {
      console.log("res", res);
    }); */

  }
}
