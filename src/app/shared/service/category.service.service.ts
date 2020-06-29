import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ICategory} from '../interfaces/category.interface';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = `${environment.firebaseConfig.databaseURL}`;
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
  addCategory(category: ICategory): Observable<Array<ICategory>> {
    return this.http.post<Array<ICategory>>(`${this.url}/category.json`, category);
  }
  deleteCategory(category: ICategory): Observable<Array<ICategory>>{
    return this.http.delete<Array<ICategory>>(`${this.url}/category/${category}.json`);
  }
  updateCategory(category: ICategory): Observable<Array<ICategory>>{
    return this.http.put<Array<ICategory>>(`${this.url}/category/${category.id}.json`, category);
  }
}
