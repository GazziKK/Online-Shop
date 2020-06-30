import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICategory} from '../../shared/interfaces/category.interface';
import {CategoryService} from '../../shared/service/category.service.service';
import {Category} from '../../shared/models/category.models';
import {Observable, Subscription} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import 'firebase/storage';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit, OnDestroy {
  nameUa: string;
  nameEn: string;
  categoryImage: string;
  adminCategory: Array<ICategory> = [];
  submited = true;
  getSub: Subscription;
  addSub: Subscription;
  delSub: Subscription;
  category: ICategory;

  // fireStorage
  uploadProgress: Observable<number>;

  constructor(
    private catService: CategoryService,
    private afStorage: AngularFireStorage
  ) { }
  ngOnInit(): void {
    this.getCategory();
  }
  private getCategory(): void {
    this. getSub = this.catService.getCategory().subscribe(
      data => {
        this.adminCategory = data;
      }
    );
  }
  public addCategory(): void{
    const category: ICategory = new Category(this.nameUa, this.nameEn, this.categoryImage);
    this.addSub = this.catService.addCategory(category).subscribe(
      () => {
        this.getCategory();
        this.nameEn = '';
        this.nameUa = '';
      }
    );
  }
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `category/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then( e => {
      this.afStorage.ref(`category/${e.metadata.name}`).getDownloadURL().subscribe( url => {
        this.categoryImage = url;
      });
    });
  }
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  public deleteCategory(category: ICategory): void{
    this.delSub = this.catService.deleteCategory(category).subscribe(
      () => {
        this.getCategory();
      }
    );
  }
  public updateCategory(category: ICategory): void{
    this.submited = false;

    this.nameEn = category.nameEn;
    this.nameUa = category.nameUA;
    console.log(category);
  }
  update(nameUa: string, nameEn: string, ) {
    const category: ICategory = new Category(this.nameUa = nameUa, this.nameEn = nameEn);
    console.log(category);
    this.catService.updateCategory(category).subscribe(
      () => {
        this.getCategory();
        this.nameEn = '';
        this.nameUa = '';
      }
    );
  }
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
