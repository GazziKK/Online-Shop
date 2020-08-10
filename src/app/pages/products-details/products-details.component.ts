import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../shared/service/products.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {IProducts} from "../../shared/interfaces/products.interface";
import {log} from "util";
import {OrdersService} from "../../shared/service/orders.service";

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  public products: Array<IProducts>;
  productID: string;
  productOne: IProducts;
  adminProducts: any = [];
  constructor(
    private prodService: ProductsService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService
  ) {
    this.router.events.subscribe( (event) => {
      if (event instanceof NavigationEnd) {
        this.productID = this.activateRoute.snapshot.paramMap.get('id');
      }
    });
  }
  ngOnInit(): void {
    this.productId(this.productID);
  }
  productId(productID) {
      this.prodService.getProducts().subscribe(data => {
        for (const datum of data) {
          this.adminProducts.push(Object.values(datum));
        }
        for (const datum of this.adminProducts.flat()) {
          if (datum.id === productID) {
            this.productOne = datum;
          }
        }
      });
  }
  addToBasket(product: IProducts): void {
    this.ordersService.addToBasket(product);
    this.ordersService.basket.next(product);
  }


}
