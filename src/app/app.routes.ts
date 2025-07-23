import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';
import { EventPageComponent } from './presentation/pages/admin/event-page/event-page.component';
import { EventCategoryPageComponent } from './presentation/pages/admin/event-category-page/event-category-page.component';
import { EventDetailsPageComponent } from './presentation/pages/admin/event-details-page/event-details-page.component';
import { HomePageComponent } from './presentation/pages/user/home-page/home-page.component';
import { EventDetailPageComponent } from './presentation/pages/user/event-detail-page/event-detail-page.component';
import { LayoutUserComponent } from './presentation/components/user/layout/layout-user.component';
import { PaymentPageComponent } from './presentation/pages/user/payment-page/payment-page.component';
import { AddEventPageComponent } from './presentation/pages/admin/add-event-page/add-event-page.component';
import { SearchPageComponent } from './presentation/pages/user/search-page/search-page.component';
import { AddEventCategoryPageComponent } from './presentation/pages/admin/add-event-category-page/add-event-category-page.component';
import { AddTicketCategoryPageComponent } from './presentation/pages/admin/add-ticket-category-page/add-ticket-category-page.component';
import { ListOrdersPageComponent } from './presentation/pages/user/list-orders-page/list-orders-page.component';
import { LayoutComponent } from './presentation/components/admin/layout/layout.component';
import { adminGuard } from './core/guards/admin.guard';
import { userGuard } from './core/guards/user.guard';
import { LoginPageComponent } from './presentation/pages/public/login-page/login-page.component';
import { RegisterPageComponent } from './presentation/pages/public/register-page/register-page.component';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    component: LoginPageComponent,
  },
  {
    path: 'cadastrar',
    canActivate: [loginGuard],
    component: RegisterPageComponent,
  },
  {
    path: '',
    component: LayoutUserComponent,
    canActivate: [userGuard],
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'evento/:id',
        component: EventDetailPageComponent,
      },
      {
        path: 'evento-ingresso/:id',
        component: PaymentPageComponent,
      },
      {
        path: 'buscar',
        component: SearchPageComponent,
      },
      {
        path: 'pedidos',
        component: ListOrdersPageComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', component: EventPageComponent },
      { path: 'eventos', component: EventPageComponent },
      { path: 'eventos/:id', component: EventDetailsPageComponent },
      { path: 'criar-evento', component: AddEventPageComponent },
      { path: 'categorias-evento', component: EventCategoryPageComponent },
      {
        path: 'categorias-evento/criar',
        component: AddEventCategoryPageComponent,
      },
      {
        path: 'categorias-ingresso/criar',
        component: AddTicketCategoryPageComponent,
      },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
