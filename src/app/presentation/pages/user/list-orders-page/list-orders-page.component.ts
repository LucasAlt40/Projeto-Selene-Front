import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { OrderApiService } from '../../../../core/api/services/order.api.service';
import { OrderDTO } from '../../../../core/model/order.model';
import { TagModule } from 'primeng/tag';
import { CurrencyPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-list-orders-page',
  imports: [
    TagModule,
    CurrencyPipe,
    Button,
    RouterModule,
    CardModule,
    DividerModule,
  ],
  templateUrl: './list-orders-page.component.html',
  styleUrl: './list-orders-page.component.css',
})
export class ListOrdersPageComponent {
  orders: OrderDTO[] = [];
  orderPayment = {
    WAITING_PAYMENT: 'Aguardando Pagamento',
    CANCELLED: 'Cancelado',
    COMPLETED: 'Finalizado',
  };

  orderPaymentSeverity = {
    WAITING_PAYMENT: 'warn',
    CANCELLED: 'danger',
    COMPLETED: 'success',
  };

  constructor(
    private authService: AuthService,
    private orderService: OrderApiService
  ) {}

  ngOnInit() {
    this.orderService
      .getAllOrdersByCustomer(this.authService.getUser()!.id)
      .subscribe({
        next: (res) => {
          this.orders = res;
        },
      });
  }
}
