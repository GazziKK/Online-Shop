import {ICategory} from '../interfaces/category.interface';

export class Category implements ICategory{
  constructor(
    public categoryTitle: string,
    public image?: string,
  ) {}
}
