import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../shared/service/products.service';
import {Router} from '@angular/router';
import {OrdersService} from '../../shared/service/orders.service';
import {IProducts} from '../../shared/interfaces/products.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  adminProducts: any = [];
  productName;
  constructor(
    public prodService: ProductsService,
    private router: Router,
    private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void {
    this.prodService.getProducts().subscribe(data => {
      for (const datum of data) {
        this.adminProducts.push(Object.values(datum));
      }
    });
  }
  productDetails(productId) {
    this.router.navigate([`product/${productId.category}/${productId.id}`]);
  }
  addToBasket(product: IProducts): void {
    this.ordersService.addToBasket(product);
    this.ordersService.basket.next(product);
  }
}
