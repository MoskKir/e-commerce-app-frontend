import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from 'src/app/shop/services/product.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  form: FormGroup;
  selectedFile: any = null;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      type: new FormControl( null, [Validators.required] ),
      title: new FormControl( null, [Validators.required] ),
      photo: new FormControl( null, [Validators.required] ),
      info: new FormControl( null, [Validators.required] ),
      price: new FormControl( null, [Validators.required] )
    })
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    let formData: any = new FormData();


    const product = {
        type: this.form.value.type,
        title: this.form.value.title,
        photo: this.selectedFile.name,
        info: this.form.value.info,
        price: this.form.value.price,
        date: new Date()
      }

    formData.append("productPhoto", this.selectedFile);
    formData.append("product", JSON.stringify(product));

    this.productService.addProduct(formData).subscribe( (res) => console.log(res))
  }

}
