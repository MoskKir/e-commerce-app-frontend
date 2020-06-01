import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthCustomersService } from '../../services/auth-customers.service';
import { AppState, selectAuthState, selectErrorMessage } from '../../shared/store/app.states';
import { LogIn } from '../../shared/store/user/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.scss']
})
export class UserLoginPageComponent implements OnInit {
  form: FormGroup;
  getErrorMessage: Observable<any> = this.store.select(selectErrorMessage);

  constructor(
    public auth: AuthCustomersService,
    private store: Store<AppState>
  ) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  submit(): void {

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
    }

    this.store.dispatch(new LogIn(user));

  }

}
