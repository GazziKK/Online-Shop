import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { ProductsComponent } from './pages/products/products.component';
import { ProductsDetailsComponent } from './pages/products-details/products-details.component';
import { BasketComponent } from './pages/basket/basket.component';

import { LoginComponent } from './login/login.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ProductsComponent,
    ProductsDetailsComponent,
    BasketComponent,
    LoginComponent,
    AdminCategoryComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
