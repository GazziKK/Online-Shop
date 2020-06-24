import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ICategory} from "../category.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = `${environment.firebaseConfig.databaseURL}/category`;
  }
  getCategory(): Observable<Array<ICategory>>{
    return this.http.get<Array<ICategory>>(this.url);
  }
  addCategory(category: ICategory): Observable<Array<ICategory>>{
    return this.http.post<Array<ICategory>>(this.url, category);
  }
  deleteCategory(category: ICategory): Observable<Array<ICategory>>{
    return this.http.delete<Array<ICategory>>(`${this.url}/${category.id}`);
  }
  updateCategory(category: ICategory): Observable<Array<ICategory>>{
    return this.http.put<Array<ICategory>>(`${this.url}/${category.id}`, category);
  }

}
