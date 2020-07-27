import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../shared/service/products.service";

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

}
