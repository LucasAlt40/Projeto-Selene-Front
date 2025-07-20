import { Routes } from '@angular/router';
import { PaymentFormComponent } from './presentation/pages/payment-form-example/payment-form.component';
import { HomePageComponent } from './presentation/pages/home-page/home-page.component';
import { LoginPageComponent } from './presentation/pages/login-page/login-page.component';
import { authGuard } from './domain/guards/auth.guard';
import { loginGuard } from './domain/guards/login.guard';
import { RegisterPageComponent } from './presentation/pages/register-page/register-page.component';
import { LayoutComponent } from './presentation/components/layout/layout.component';
import { EventPageComponent } from './presentation/pages/admin/event-page/event-page.component';
import { EventCategoryPageComponent } from './presentation/pages/admin/event-category-page/event-category-page.component';
import { EventDetailsPageComponent } from './presentation/pages/admin/event-details-page/event-details-page.component';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    component: LoginPageComponent,
  },
  {
    path: 'register',
    canActivate: [loginGuard],
    component: RegisterPageComponent,
  },
  {
    path: '',
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'payment',
        component: PaymentFormComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', component: EventPageComponent },
      { path: 'eventos', component: EventPageComponent },
      { path: 'eventos/:id', component: EventDetailsPageComponent },
      { path: 'categorias-evento', component: EventCategoryPageComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
