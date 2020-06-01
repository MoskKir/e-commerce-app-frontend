import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { USER_REDUCE_NODE, reducer } from './user/auth.reducers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_REDUCE_NODE, reducer),
  ]
})

export class UserStoreModule {}
