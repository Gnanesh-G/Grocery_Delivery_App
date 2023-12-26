import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class AdminorderComponent implements OnInit {
  error: string = '';
  orders: Order[] = [];
  status: number = 0;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (response: any) => {
        this.orders = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  onStatusChange(order: Order) {
    this.orderService.setStatus(order.id, order.orderStatus!).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });
  }
}
