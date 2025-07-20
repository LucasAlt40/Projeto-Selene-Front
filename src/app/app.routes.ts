import { Routes } from '@angular/router';
import { PaymentFormComponent } from './presentation/pages/payment-form-example/payment-form.component';
import { LoginPageComponent } from './presentation/pages/login-page/login-page.component';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { LayoutComponent } from './presentation/components/layout/layout.component';
import { EventPageComponent } from './presentation/pages/admin/event-page/event-page.component';
import { TicketCategoryPageComponent } from './presentation/pages/admin/ticket-category-page/ticket-category-page.component';
import { EventCategoryPageComponent } from './presentation/pages/admin/event-category-page/event-category-page.component';
import { AddEventPageComponent } from './presentation/pages/add-event-page/add-event-page.component';
import { RegisterPageComponent } from './presentation/pages/user/register-page/register-page.component';
import { HomePageComponent } from './presentation/pages/user/home-page/home-page.component';
import { EventDetailPageComponent } from './presentation/pages/user/event-detail-page/event-detail-page.component';

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
        path: 'evento/:id',
        component: EventDetailPageComponent
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
      {
        path: '',
        component: EventPageComponent,
      },
      {
        path: 'eventos',
        component: EventPageComponent,
      },
      {
        path: 'criar-evento',
        component: AddEventPageComponent,
      },
      { path: 'categorias-evento', component: EventCategoryPageComponent },
      { path: 'categorias-ingresso', component: TicketCategoryPageComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
