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

  getAll(pageNo = 1, size = 10) {
    return this.http.get(`http://localhost:3003/api/products?pageNo=${pageNo}&size=${size}`)
  }

  getById(id) {
    return this.http.get(`http://localhost:3003/api/products/${id}`)
  }

  remove(id) {
    return this.http.delete(`http://localhost:3003/api/products/${id}`)
  }

  update(product) {
    return this.http.patch(`http://localhost:3003/api/products/${product.id}`, product)
  }
}
