import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ClickOutsideModule } from 'ng-click-outside';
import { localStorageSync } from 'ngrx-store-localstorage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { ProductCardComponent } from './product-card/product-card.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthCustomersService } from './shared/auth-customers.service';
import { AuthEffects } from './shared/store/user/auth.effects';
import { reducers } from './shared/store/app.states';
import { AuthModule } from './shared/store/auth.module';
import { CustomerMainMenuComponent } from './customer-main-menu/customer-main-menu.component';
import { TokenInterceptor } from './shared/auth-customers-token.interceptor';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['auth'], rehydrate: true})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    ProductPageComponent,
    CartPageComponent,
    ProductCardComponent,
    SignUpPageComponent,
    UserLoginPageComponent,
    CustomerMainMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      reducers,
      {metaReducers}
      ),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    AuthModule,
    ClickOutsideModule,
  ],
  providers: [
    AuthCustomersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
