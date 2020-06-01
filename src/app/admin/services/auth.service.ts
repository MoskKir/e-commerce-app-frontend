import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post(`${environment.apiBEUrl}managers/login`, user)
      .pipe(
        tap(this.setToken)
      )
  }

  private setToken(response) {
    if (response) {
      const expData = new Date( new Date().getTime() * 1000 );
      localStorage.setItem('man-token-exp', expData.toString());
      localStorage.setItem('man-token', response.token);
    } else {
      localStorage.clear();
    }
  }

  get token() {
    const expDate = new Date(localStorage.getItem('man-token-exp'))
    if (new Date > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('man-token')
  }

  logout() {
    this.setToken(null);
  }

  isAuthenicated() {
    return !!this.token;
  }


}
