import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ICategory} from '../interfaces/category.interface';
import {map} from 'rxjs/operators';
import {Category} from "../models/category.models";
import {AngularFireDatabase} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnInit{
  private url: string;

  tableName = `todos`;
  dbRef = this.fireDB.database.ref(this.url);
  // tableName = 'category';

  constructor(private http: HttpClient,
              private fireDB: AngularFireDatabase,
              // private fireService: AppFirebaseService
  ) {
    this.url = `${environment.firebaseConfig.databaseURL}`;
  }
  ngOnInit(): void {
    this.urlTest().subscribe(data => {
      console.log(data)
    })
  }

  get urlTest() {
    return `/category`;
    this.dbRef.child('test').set('test2')
  }

  getCategory(): Observable<Array<ICategory>>{
    return this.http.get<Array<ICategory>>(`${this.url}/category.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key
          }));
      }));
  }

  // getCategory(category): Observable<Array<ICategory>>{
  //   return this.http.get<IgetCategory>(`${this.url}/category/${name}.json`)
  //     .pipe(map(res => {
  //       return {...category, id: res.name};
  //     }));
  // }


  // addCategory(category: ICategory): Observable<Array<ICategory>> {
  //   return this.http.post<Array<ICategory>>(`${this.url}/category/${category.categoryTitle}.json`, category);
  // }

  addCategory(category: Category): Observable<Array<ICategory>> {
    return this.http.post<Array<ICategory>>(`${this.url}/category.json`, category);
  }


  deleteCategory(category: ICategory): Observable<Array<ICategory>>{
    return this.http.delete<Array<ICategory>>(`${this.url}/category/${category}.json`);
  }

  updateCategory(category: ICategory): Observable<Array<ICategory>>{
    return this.http.put<Array<ICategory>>(`${this.url}/category/${category.categoryTitle}.json`, category);
  }
}

















