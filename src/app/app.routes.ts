import { Routes } from '@angular/router';
import { PaymentFormComponent } from './presentation/pages/payment-form-example/payment-form.component';
import { HomePageComponent } from './presentation/pages/home-page/home-page.component';
import { LoginPageComponent } from './presentation/pages/login-page/login-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'payment',
    component: PaymentFormComponent,
  },
];
