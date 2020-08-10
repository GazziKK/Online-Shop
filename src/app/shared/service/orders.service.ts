import { Injectable } from '@angular/core';
import {IProducts} from '../interfaces/products.interface';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IOrder} from '../interfaces/order.interface';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  basket: Subject<any> = new Subject<any>();
  localProducts: Array<IProducts> = [];
  url: string;
  constructor(
    private http: HttpClient,
  ) {
    this.url = `${environment.firebaseConfig.databaseURL}`;
  }
  getOrder(): Observable<Array<IOrder>> {
    return this.http.get<Array<IOrder>>(`${this.url}/orders.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key
          }));
      }));
  }
  deleteOrder(order: IOrder): Observable<Array<IOrder>> {
    return this.http.delete<Array<IOrder>>(`${this.url}/orders/${order.id}.json`);
  }
  addOrder(order: IOrder): Observable<Array<IOrder>> {
    return this.http.post<Array<IOrder>>(`${this.url}/orders.json`, order);
  }

    addToBasket(product: IProducts): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.localProducts = JSON.parse(localStorage.getItem('basket'));
      if (this.localProducts.some(prod => prod.id === product.id)) {
        const index = this.localProducts.findIndex( prod => prod.id === product.id );
        this.localProducts[index].count += product.count;
      } else {
        this.localProducts.push(product);
      }
      localStorage.setItem('basket', JSON.stringify(this.localProducts));
    } else {
      this.localProducts.push(product);
      localStorage.setItem('basket', JSON.stringify(this.localProducts));
    }
  }
}
