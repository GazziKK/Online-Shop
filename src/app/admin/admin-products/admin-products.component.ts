import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../shared/service/category.service.service';
import {ICategory} from '../../shared/interfaces/category.interface';
import {IProducts} from '../../shared/interfaces/products.interface';
import {ProductsService} from '../../shared/service/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  adminCategory: Array<ICategory> = [];
  adminProducts: any = [];
  form: FormGroup;
  edit = false;
  idProduct: any;
  formCategory: FormGroup;
  productName;
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
      imageTitle: new FormControl(null),
    });
    this.formCategory = new FormGroup({
      categoryDelete: new FormControl(null, Validators.required)
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
    this.prodService.getProducts().subscribe(data => {
      for (const datum of data) {
        this.adminProducts.push(Object.values(datum));
      }
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
      imageTitle: this.form.value.imageTitle,
      date: new Date(),
    };
    console.log(product);
    this.prodService.addCategory(product).subscribe();
    this.getProducts();
    this.form.reset();


  }
  deleteProduct(product) {
    this.prodService.getProductId(product).subscribe(prod => {
      for (const prodOne of Object.values(prod)) {
        if (JSON.stringify(product.date) === JSON.stringify(prodOne.date)){
          this.prodService.deleteProduct(prodOne).subscribe();
          return;
        }
      }
    });
    this.getProducts();
  }
  editProduct(product) {
    this.edit = true;

    this.form = new FormGroup({
      category: new FormControl(product.category, Validators.required),
      title: new FormControl(product.title, Validators.required),
      price: new FormControl(product.price, Validators.required),
      description: new FormControl(product.description),
      imageProd: new FormControl(product.imageProd),
      imageTitle: new FormControl(product.imageTitle),
    });
    this.prodService.getProductId(product).subscribe(prod => {
      for (const prodOne of Object.values(prod)) {
        if (JSON.stringify(product.date) === JSON.stringify(prodOne.date)){
          this.idProduct = prodOne.id;
          return;
        }
      }
    });

  }
  updateProduct() {
    if (this.form.invalid){
      return;
    }
    const product: IProducts = {
      category: this.form.value.category,
      title: this.form.value.title,
      price: this.form.value.price,
      description: this.form.value.description,
      imageProd: this.form.value.imageProd,
      imageTitle: this.form.value.imageTitle,
      id: this.idProduct,
      date: new Date()
    };
    this.prodService.updateProduct(product).subscribe();
    this.getProducts();
    this.form.reset();
  }

  deleteProductAndCategory() {
    const category = this.formCategory.value.categoryDelete;
    this.prodService.deleteCategory(category).subscribe();
    this.getProducts();
    this.formCategory.reset();
  }
}
