import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../shared/service/category.service.service';
import {ICategory} from '../../shared/interfaces/category.interface';
import {IProducts} from '../../shared/interfaces/products.interface';

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
    private catService: CategoryService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      category: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
    this.getCategory();
  }
  getCategory(): void {
    this.catService.getCategory().subscribe(data => {
      this.adminCategory = data;
      console.log(this.adminCategory)
    });
  }



  submit() {
    if (this.form.invalid){
      return
    }
    const product: IProducts = {
      category: this.form.value.category,
      title: this.form.value.title,
      price: this.form.value.price,
      description: this.form.value.description,
      date: new Date(),
    };
    console.log(product);

  }
}
