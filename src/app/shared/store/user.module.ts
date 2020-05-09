import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { USER_REDUCE_NODE, userReducer } from './user/user.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_REDUCE_NODE, userReducer),

  ]
})

export class UserModule {}
