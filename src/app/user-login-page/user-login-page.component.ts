import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SingupService } from '../shared/singup.service';
import { Router } from '@angular/router';

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
    public auth: SingupService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
    }

    this.loginSubsc = this.auth
      .login(user)
      .subscribe(() => {
        this.form.reset;
        this.submitted = false;
      }, () => {
        this.submitted = false;
      })
  }

  ngOnDestroy() {
    if (this.loginSubsc) this.loginSubsc.unsubscribe();
  }

}
