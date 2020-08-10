import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../shared/service/category.service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  category = [];
  constructor(
    private  catService: CategoryService,
    private route: Router,
    ) { }

  ngOnInit(): void {
    this.getCategory();
  }
  getCategory() {
    this.catService.getCategory().subscribe(data => {
      this.category = data;
    });
  }
  setCategory(category) {
    this.route.navigate([`product/${category.categoryTitle}`]);
  }
}
