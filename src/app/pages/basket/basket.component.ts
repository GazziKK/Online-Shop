import { Component, OnInit } from '@angular/core';
import {IProducts} from '../../shared/interfaces/products.interface';
import {OrdersService} from '../../shared/service/orders.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IOrder} from "../../shared/interfaces/order.interface";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  order = [];
  count: boolean;
  form: FormGroup;
  submitet = false;
  constructor(
    private orderServ: OrdersService
  ) { }

  ngOnInit(): void {
    this.getProductsFromBasket();
    this.form = new FormGroup({
      userName: new FormControl(null, Validators.required),
      userPhone: new FormControl(null, Validators.required),
      userCity: new FormControl(null, Validators.required),
      userStreet: new FormControl(null, Validators.required),
      userHouse: new FormControl(null, Validators.required),
      userComment: new FormControl(null)
    });
  }
  private getProductsFromBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.order = JSON.parse(localStorage.getItem('basket'));
    }else {
      this.order = []
    }
  }
  productsCount(order: IProducts, count: boolean): void {
    if (count){
      order.count++;
      this.order.splice(this.order.indexOf(order), 1, order);
      localStorage.setItem('basket' , JSON.stringify(this.order));
      this.orderServ.basket.next(order);
    } else {
      if (order.count > 1){
        order.count--;
        this.order.splice(this.order.indexOf(order), 1, order);
        localStorage.setItem('basket' , JSON.stringify(this.order));
        this.orderServ.basket.next(order);

      }
    }
  }
  deleteOrder(order: IProducts) {
    const orderMinus = this.order.indexOf(order);
    if (orderMinus > -1) {
      this.order.splice(orderMinus, 1);
    }
    localStorage.setItem('basket' , JSON.stringify(this.order))
    this.orderServ.basket.next(order);
  }
  submit() {
    if (this.form.invalid){
      return;
    }
    const orders: IOrder = {
      userName: this.form.value.userName,
      userPhone: this.form.value.userPhone,
      userCity: this.form.value.userCity,
      userStreet: this.form.value.userStreet,
      userHouse: this.form.value.userHouse,
      userComment: this.form.value.userComment,
      ordersDetails: this.order,
    };
    this.orderServ.addOrder(orders).subscribe(() => {
      localStorage.removeItem('basket');
      this.getProductsFromBasket();
    });
    this.form.reset();
  }
}
