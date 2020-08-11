import { Component, OnInit } from '@angular/core';
import {OrdersService} from '../../shared/service/orders.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  getProducts: Array<any> = [];
  price = 0;
  constructor(
    private ordersService: OrdersService,
  ) { }
  ngOnInit(): void {
    this.productLength();
    this.getProductsFromBasket();
  }
  private productLength(): void {
    this.ordersService.basket.subscribe(() => {
      this.getProductsFromBasket();
    });
  }
  private getProductsFromBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.getProducts = JSON.parse(localStorage.getItem('basket'));
      this.price = this.getProducts.reduce((accum, product) => accum + (+product.price * +product.count), 0);
    }
  }
}
