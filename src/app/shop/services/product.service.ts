import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient) { }

  addProduct(product) {
    return this.http.post('http://localhost:3003/api/products', product)
  }

  getAll() {
    return this.http.get('http://localhost:3003/api/products')
  }

  getById(id) {
    return this.http.get(`http://localhost:3003/api/products/${id}`)
  }
}
