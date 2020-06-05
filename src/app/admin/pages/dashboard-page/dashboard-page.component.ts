import { Component } from '@angular/core';
import { ProductService } from 'src/app/shop/services/product.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {

  products;
  productsA;

  productSub: Subscription;

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit() {
    this.productSub = this.productServ.getAll().subscribe( products => {
      this.products = products;
      console.log(this.products.length)
    });
  }

  remove(id) {
    console.log(id)
    this.productServ.remove(id).subscribe( () => {
      this.productsA = this.products.filter( product => {
        console.log(product.id)
        console.log(id)
        return product.id !== id
      })
      console.log(this.productsA)
    })
  }

  ngOnDestroy() {
    if (this.productSub) this.productSub.unsubscribe();
  }

}
