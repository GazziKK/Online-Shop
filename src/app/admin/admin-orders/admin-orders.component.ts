import { Component, OnInit } from '@angular/core';
import {OrdersService} from '../../shared/service/orders.service';
import {IOrder} from '../../shared/interfaces/order.interface';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: Array<IOrder> = [];
  constructor(
    private orderServ: OrdersService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.orderServ.getOrder().subscribe(data => {
      this.orders = data;
    });
    this.orders = [];
  }

  successOrder(order: IOrder) {
    this.orderServ.deleteOrder(order).subscribe( () => {
      this.getOrders();
    });
  }
}
