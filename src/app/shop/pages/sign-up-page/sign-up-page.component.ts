import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthCustomersService } from '../../services/auth-customers.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loginSubsc: any;

  constructor(
    public auth: AuthCustomersService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
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
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    }

    this.loginSubsc = this.auth
      .singup(user)
      .subscribe(response => {
        console.log(response)
        this.form.reset;
        this.router.navigate(['login']);
        this.submitted = false;
      }, () => {
        this.submitted = false;
      })
  }

  ngOnDestroy() {
    if (this.loginSubsc) this.loginSubsc.unsubscribe();
  }

}
