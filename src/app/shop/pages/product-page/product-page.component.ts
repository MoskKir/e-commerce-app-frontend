import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit{

  product$

  constructor(
    private productServ: ProductService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.product$ = this.router.params
      .pipe(
        switchMap(
          params => {
            return this.productServ.getById(params['id'])
          }
        )
      )
  }

}
