import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

import { AuthCustomersService } from '../../auth-customers.service';
import { AuthActionTypes, LogIn, LogInSuccess } from './auth.actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthCustomersService,
    private router: Router,
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
      switchMap(payload => {
        console.log('Payload ',payload)
        return this.authService.login(payload)
          .pipe(
            map((user) => {
              return new LogInSuccess(user);
            })
        )
      })
    )

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );
}

