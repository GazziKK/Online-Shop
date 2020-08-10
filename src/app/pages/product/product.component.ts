import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../shared/service/products.service';
import {IProducts} from '../../shared/interfaces/products.interface';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {OrdersService} from '../../shared/service/orders.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public products: Array<IProducts>;
  localProducts: Array<IProducts> = [];
  categoryName: string;
  productName: string;
  idProduct: any;
  constructor(
    private prodService: ProductsService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService
  ) {
    this.router.events.subscribe( (event) => {
      if (event instanceof NavigationEnd) {
        this.categoryName = this.activateRoute.snapshot.paramMap.get('category');
        this.prodService.getProductsCategory(this.categoryName).subscribe(data => {
          this.products = data;
        });
      }
    });
  }

  ngOnInit(): void {
  }

  productId(productId) {
    this.router.navigate([`product/${productId.category}/${productId.id}`]);
  }
  addToBasket(product: IProducts): void {
    this.ordersService.addToBasket(product);
    this.ordersService.basket.next(product);
  }

}
