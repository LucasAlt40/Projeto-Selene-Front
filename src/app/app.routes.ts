import { Routes } from '@angular/router';
import { PaymentFormComponent } from './presentation/pages/payment-form-example/payment-form.component';
import { HomePageComponent } from './presentation/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'payment',
    component: PaymentFormComponent,
  },
];
