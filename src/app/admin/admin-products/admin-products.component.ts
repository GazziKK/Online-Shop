import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../shared/service/category.service.service';
import {ICategory} from '../../shared/interfaces/category.interface';
import {IProducts} from '../../shared/interfaces/products.interface';
import {ProductsModels} from "../../shared/models/products.models";
import {ProductsService} from "../../shared/service/products.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  category: ICategory;
  adminCategory: Array<ICategory> = [];
  form: FormGroup;
  constructor(
    private catService: CategoryService,
    private prodService: ProductsService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      category: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      img: new FormControl(null),
    });
    this.getCategory();
    this.getProduct()

  }
  getCategory(): void {
    this.catService.getCategory().subscribe(data => {
      this.adminCategory = data;
      console.log(this.adminCategory)
    });
  }
  submit() {
    if (this.form.invalid){
      return;
    }
    const product: IProducts =  new ProductsModels(
      this.form.value.category,
      this.form.value.title,
      this.form.value.price,
      this.form.value.description,
      new Date(),
      this.form.value.img,
  );

    this.prodService.addProduct(product).subscribe( () => {
      this.form.reset();
      }
    );
  }
  getProduct(): void {
    this.prodService.getProduct().subscribe(data => {
      console.log(data)

    })

  }
}
