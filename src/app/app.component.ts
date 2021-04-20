import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsComponent } from './shared/products/products.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ProductsComponent, { static: false }) productsComponent: ProductsComponent
  orderSuccess: any;
  myForm: FormGroup;

  newCategory = event  => this.productsComponent.getProducts(event)

  newOrder(event) {
    console.log(event);
    this.orderSuccess = event
    this.buildForm()
  }
  buildForm() {
    this.myForm = new FormGroup({
      full_name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      document_type: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      document: new FormControl('', Validators.required),
    })
  }
  onSubmitConfirmation() {
    if (this.myForm.invalid) return;
    console.log(this.myForm.value);
  }
}
