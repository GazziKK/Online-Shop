import { Pipe, PipeTransform } from '@angular/core';
import {IProducts} from '../interfaces/products.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: IProducts[], productName = ''): any {
    if (!productName.trim()) {
      return products
    }
    return products.filter( product => {
      return product.title.toLowerCase().includes(productName.toLowerCase());
    });
  }

}
