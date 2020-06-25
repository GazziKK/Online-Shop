import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICategory} from '../../shared/interfaces/category.interface';
import {CategoryService} from '../../shared/service/category.service.service';
import {Category} from '../../shared/models/category.models';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit, OnDestroy {
  nameUa: string;
  nameEn: string;
  adminCategory: Array<ICategory> = [];
  submited = true;
  getSub: Subscription;
  addSub: Subscription;
  delSub: Subscription;
  category: ICategory;

  constructor(private catService: CategoryService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  private getCategory(): void {
    this. getSub = this.catService.getCategory().subscribe(
      data => {
        this.adminCategory = data;
        console.log(this.adminCategory);
      //  цей консол лог потрібен для того щоб подивитися що підтягується
      }
    );
  }

  public addCategory(): void{
    const category: ICategory = new Category(this.nameUa, this.nameEn);
    this.addSub = this.catService.addCategory(category).subscribe(
      () => {
        this.getCategory();
        this.nameEn = '';
        this.nameUa = '';
      }
    );
  }
  public deleteCategory(category: ICategory): void{
    this.delSub = this.catService.deleteCategory(category).subscribe(
      () => {
        this.getCategory();
      }
    );
  }
  // public updateCategory(category: ICategory): void{
  //   this.submited = false;
  //   this.nameEn = category.nameEn;
  //   this.nameUa = category.nameUA;
  //   console.log(category);
  // }



  ngOnDestroy(): void {
    if (this.getSub) {
      this.getSub.unsubscribe();
    }
    if (this.addSub) {
      this.addSub.unsubscribe();
    }
    if (this.delSub) {
      this.delSub.unsubscribe();
    }
  }


}
