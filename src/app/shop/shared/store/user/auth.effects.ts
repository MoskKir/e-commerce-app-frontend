import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map, catchError } from 'rxjs/operators';

import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure } from './auth.actions';
import { AuthCustomersService } from 'src/app/shop/services/auth-customers.service';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthCustomersService,
    private router: Router,
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType<LogIn>(AuthActionTypes.LOGIN),
    switchMap(action => {
      return this.authService.login(action.payload).pipe(
        map(user => new LogInSuccess(user)),
        catchError(error => of(new LogInFailure(error)))
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

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
    })
  );
}

