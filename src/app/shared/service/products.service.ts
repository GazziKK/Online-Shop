import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ICategory} from '../interfaces/category.interface';
import {map} from 'rxjs/operators';
// import {Products} from '../models/products.models';
import {IProducts} from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url: string;

  constructor(private http: HttpClient,) {
    this.url = `${environment.firebaseConfig.databaseURL}`;
  }
  getProducts(): Observable<Array<IProducts>>{
    return this.http.get<Array<IProducts>>(`${this.url}/products.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key]
          }));
      }));
  }
  getProductId(): Observable<Array<IProducts>>{
    return this.http.get<Array<IProducts>>(`${this.url}/products.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key]
          }));
      }));
  }
  addCategory(product: IProducts): Observable<Array<IProducts>> {
    return this.http.post<Array<IProducts>>(`${this.url}/products.json`, product);
  }


  // deleteCategory(product: IProducts): Observable<Array<IProducts>>{
  //   return this.http.delete<Array<IProducts>>(`${this.url}/products/${category}.json`);
  // }

  updateCategory(category: ICategory): Observable<Array<ICategory>>{
    return this.http.put<Array<ICategory>>(`${this.url}/category/${category.categoryTitle}.json`, category);
  }
}
