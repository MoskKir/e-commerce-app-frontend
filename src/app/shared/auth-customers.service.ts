import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthCustomersService {

  constructor(
    private http: HttpClient,
    private store: Store
    ) { }

  singup(user) {
    // add interface
    // up url to const
    return this.http.post(`http://localhost:3003/api/users`, user)
  }

  login(user) {
    console.log(user)
    return this.http.post(`http://localhost:3003/api/users/login`, user)
      // .pipe(
      //   tap(this.setToken),
      //   catchError(this.handleError)
      // )
  }

  private setToken(response) {
    // console.log(response)
    if (response) {
      const expData = new Date( new Date().getTime() * 1000 );
      localStorage.setItem('bc-token-exp', expData.toString());
      localStorage.setItem('bc-token', response.token);
      // console.log(response)
      // this.store.dispatch(new GetUserAction(response))
    } else {
      console.log('check')
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.error}`);
        localStorage.clear();
        return error.error.error;
    }
    return throwError(
      'Something bad happened; please try again later.');
  };


}
