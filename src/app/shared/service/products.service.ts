import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IProducts} from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url: string;

  constructor(
    private http: HttpClient
  ) {
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
  getProductId(product: IProducts): Observable<Array<IProducts>>{
    return this.http.get<Array<IProducts>>(`${this.url}/products/${product.category}.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key
          }));
      }));
  }

  addCategory(product: IProducts): Observable<Array<IProducts>> {
    return this.http.post<Array<IProducts>>(`${this.url}/products/${product.category}.json`, product);
  }

  deleteProduct(product: IProducts): Observable<Array<IProducts>>{
    return this.http.delete<Array<IProducts>>(`${this.url}/products/${product.category}/${product.id}.json`);
  }

  updateProduct(product: IProducts): Observable<Array<IProducts>>{
    return this.http.put<Array<IProducts>>(`${this.url}/products/${product.category}/${product.id}.json`, product);
  }
}
