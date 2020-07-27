import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICategory} from '../../shared/interfaces/category.interface';
import {CategoryService} from '../../shared/service/category.service.service';
import {Observable, Subscription} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import 'firebase/storage';
import {Category} from '../../shared/models/category.models';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit, OnDestroy {
  categoryId: string;
  categoryTitle: string;
  categoryImage: string;
  adminCategory: Array<ICategory> = [];
  submited = true;
  getSub: Subscription;
  addSub: Subscription;
  delSub: Subscription;
  category: ICategory;
  uploadProgress: Observable<number>;
  form: FormGroup
  constructor(
    private catService: CategoryService,
    private afStorage: AngularFireStorage
  ) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      categoryDelete: new FormControl(null, Validators.required)
    });
    this.getCategory();
  }
  private getCategory(): void {
    this. getSub = this.catService.getCategory().subscribe(
      data => {
        console.log(data)
        this.adminCategory = data;
      }
    );
  }
  public addCategory(){
    const category = new Category(this.categoryTitle, this.categoryImage);
    this.addSub = this.catService.addCategory(category)
      .subscribe(() => {
          this.getCategory();
          this.categoryTitle = '';
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

    this.categoryTitle = category.categoryTitle;
    this.categoryId = category.id;
  }
  update() {
    const category: ICategory = {
      categoryTitle: this.categoryTitle,
      image : this.categoryImage,
      id: this.categoryId
    };
    this.catService.updateCategory(category)
      .subscribe(res => {
        console.log(res);
        this.getCategory();
        this.categoryTitle = '';
      }
    );
    this.submited = true;
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

  deleteProductAndCategory() {
    console.log('work');
  }
}
