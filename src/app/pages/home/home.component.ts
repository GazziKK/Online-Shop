import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../shared/service/category.service.service";
import {Router} from "@angular/router";
import {ProductsService} from "../../shared/service/products.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  category = [];
  constructor(
    private  catServ: CategoryService,
    private route: Router,
    private prodServ: ProductsService,
    ) { }

  ngOnInit(): void {
    this.getCategory();
  }
  getCategory() {
    this.catServ.getCategory().subscribe(data => {
      this.category = data;
      console.log(this.category)
    });
  }
  setCategory(categoryTitle) {
    this.route.navigate(['products']);
    this.prodServ.setType(categoryTitle);
  }
}
