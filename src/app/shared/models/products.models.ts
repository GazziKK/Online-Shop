import {IProducts} from '../interfaces/products.interface';

export class Products implements IProducts{
  constructor(
    public category: string,
    public title: string,
    public price: number,
    public description: string,
    public imageProd: string,
    public date?: Date,
    public id?: number,
  ) {
  }
}
