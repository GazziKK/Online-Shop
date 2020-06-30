import {IProducts} from '../interfaces/products.interface';

export class ProductsModels implements IProducts{
  constructor(
    public category: string,
    public title: string,
    public price: number,
    public description: string,
    public date: Date,
    public img?: string,
    public id?: number,
  ) {
  }
}
