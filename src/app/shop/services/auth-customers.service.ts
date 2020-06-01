import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthCustomersService {

  constructor(
    private http: HttpClient,
    private store: Store
    ) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  singup(user) {
    return this.http.post(`${environment.apiBEUrl}users`, user)
  }

  login(user) {
    return this.http.post(`${environment.apiBEUrl}users/login`, user)
  }

}
