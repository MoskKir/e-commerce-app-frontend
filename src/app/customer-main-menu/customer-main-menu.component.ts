import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../shared/store/app.states';
import { Observable } from 'rxjs';
import { LogOut } from '../shared/store/user/auth.actions';


@Component({
  selector: 'app-customer-main-menu',
  templateUrl: './customer-main-menu.component.html',
  styleUrls: ['./customer-main-menu.component.scss']
})
export class CustomerMainMenuComponent implements OnInit {

  getState: Observable<any>;
  user: any;
  errorMessage: any;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }

}
