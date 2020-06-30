import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IProducts} from '../interfaces/products.interface';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url: string;
  constructor( private http: HttpClient) {
    this.url = `${environment.firebaseConfig.databaseURL}/category`;
  }
  addProduct(product: IProducts): Observable<Array<IProducts>> {
    return this.http.post<Array<IProducts>>(`${this.url}/${product.category}.json`, product);
  }

  getProduct(): Observable<Array<IProducts>> {
    return this.http.get<Array<IProducts>>(`${this.url}.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key
          }));
      }));




    // for (const dataKey in data) {
    //   console.log(data[dataKey])
    //   map((res: {[key: string]: any}) => {
    //     return Object.
    //
    //   })
    // }
  }
}
