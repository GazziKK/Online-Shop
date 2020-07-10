import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../shared/service/category.service.service';
import {ICategory} from '../../shared/interfaces/category.interface';
import {IProducts} from '../../shared/interfaces/products.interface';
import {Products} from "../../shared/models/products.models";
import {ProductsService} from "../../shared/service/products.service";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  // category: ICategory;
  allProducts: IProducts;
  adminCategory: Array<ICategory> = [];
  form: FormGroup;
  constructor(
    private catService: CategoryService,
    private prodService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      category: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(null),
      imageProd: new FormControl(null),
    });
    this.getCategory();
    this.getProducts();

  }
  getCategory(): void {
    this.catService.getCategory().subscribe(data => {
      this.adminCategory = data;
    });
  }
  getProducts(): void {
    this.prodService.getCategory().subscribe(data => {

      console.log(Object.values(data))
      console.log(Object.keys(data))
    });
  }



  submit() {
    if (this.form.invalid){
      return;
    }
    const product: IProducts = {
      category: this.form.value.category,
      title: this.form.value.title,
      price: this.form.value.price,
      description: this.form.value.description,
      imageProd: this.form.value.imageProd,
      date: new Date(),
    };
    console.log(product);
    this.prodService.addCategory(product).subscribe(date => {
      console.log(date)
    })


  }
}
