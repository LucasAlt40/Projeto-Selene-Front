import { Routes } from '@angular/router';
import { PaymentFormComponent } from './presentation/pages/payment-form-example/payment-form.component';
import { HomePageComponent } from './presentation/pages/home-page/home-page.component';
import { LoginPageComponent } from './presentation/pages/login-page/login-page.component';
import { EventPageComponent } from './presentation/pages/event-page/event-page.component';
import { authGuard } from './domain/guards/auth.guard';
import { loginGuard } from './domain/guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    component: LoginPageComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'payment',
        component: PaymentFormComponent,
      },
      {
        path: 'eventos',
        component: EventPageComponent,
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
