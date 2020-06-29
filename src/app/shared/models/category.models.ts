import {ICategory} from '../interfaces/category.interface';

export class Category implements ICategory{
  constructor(
    public nameUA: string,
    public nameEn: string,
    public id?: number,
  ) {}
}
