import { Component, OnInit } from '@angular/core';
import {ICategory} from '../../shared/category.interface';
import {CategoryService} from '../../shared/service/category.service.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  nameUa: string;
  nameEn: string;
  adminCategory: Array<ICategory> = [];

  constructor(private catService: CategoryService) { }

  ngOnInit(): void {
  }

}
