import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  products$: Observable<any>;
  p: number = 1;

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit() {
    this.products$ = this.productServ.getAll();
  }

  setPage($event) {
    this.p = $event
  }

}
