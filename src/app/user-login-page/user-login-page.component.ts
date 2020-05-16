import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthCustomersService } from '../shared/auth-customers.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogIn } from '../shared/store/user/auth.actions';
import { AppState } from '../shared/store/app.states';

@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.scss']
})
export class UserLoginPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loginSubsc: any;

  constructor(
    public auth: AuthCustomersService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
    }

    this.store.dispatch(new LogIn(user));


    // this.loginSubsc = this.auth
    // .login(user)
    // .subscribe(() => {
    //   // здесь нужен диспатч на стейт
    //     // this.store.dispatch(new GetUserAction(user))
    //     this.form.reset;
    //     this.submitted = false;
    //   }, () => {
    //     this.submitted = false;
    //   })
  }

  ngOnDestroy() {
    if (this.loginSubsc) this.loginSubsc.unsubscribe();
  }

}
