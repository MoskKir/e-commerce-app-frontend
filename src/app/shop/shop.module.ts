import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgxPaginationModule } from 'ngx-pagination';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductCardComponent } from './pages/product-card/product-card.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { UserLoginPageComponent } from './pages/user-login-page/user-login-page.component';
import { UserStoreModule } from './shared/store/user-store.module';
import { CustomerMainMenuComponent } from './layouts/customer-main-menu/customer-main-menu.component';

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', component: MainLayoutComponent,
        children: [
          {path: '', redirectTo: '/', pathMatch: 'full'},
          {path: '', component: MainPageComponent},
          {path: 'product/:id', component: ProductPageComponent},
          {path: 'cart', component: CartPageComponent},
          {path: 'login', component: UserLoginPageComponent},
          {path: 'sing-up', component: SignUpPageComponent}
        ]
      },
    ]),
    UserStoreModule,
    ClickOutsideModule,
    NgxPaginationModule,
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    MainLayoutComponent,
    MainPageComponent,
    ProductPageComponent,
    CartPageComponent,
    ProductCardComponent,
    SignUpPageComponent,
    UserLoginPageComponent,
    CustomerMainMenuComponent,
  ],
})

export class ShopModule {}
