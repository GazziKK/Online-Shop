import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { QuillModule } from 'ngx-quill';

import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AuthInterceptor} from './shared/guards/auth.interceptor';
import { SearchPipe } from './shared/pipes/search.pipe';
import { SortingPipe } from './shared/pipes/sorting.pipe';
import { ProductComponent } from './pages/product/product.component';
import {NgxUiLoaderModule, NgxUiLoaderRouterModule} from 'ngx-ui-loader';
import {ngxUiLoader} from './shared/config/preloader-config';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

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
    HomeComponent,
    SearchPipe,
    SortingPipe,
    ProductComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        NgxUiLoaderModule.forRoot(ngxUiLoader),
        NgxUiLoaderRouterModule,


    ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
