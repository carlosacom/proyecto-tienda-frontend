import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Output() newOrder: EventEmitter<any>
  category: string
  products: any[]

  order: any[]
  constructor(
    private backend: BackendService,
    private toasr: ToastrService
  ) {
    this.newOrder = new EventEmitter();
    this.order = []
  }

  getProducts(category) {
    this.category = category
    this.backend.getProducts(category).then((response) => {
      this.products = response
    }).catch((err) => {
      console.error(err);
    });
  }
// modelo de orden
  manageOrder(product, add: number) {
    console.log(product);
    const order = this.order.findIndex(o => o.product == product)
    console.log(order);
    if (order < 0) {
      if (add == 1) {
        const item = {
          product,
          amount: 1
        }
        console.log(this.order, item);
        this.order.push(item)
      }
    } else {
      this.order[order].amount = this.order[order].amount + add
      if (this.order[order].amount == 0) this.order.splice(order, 1);
    }
  }

  submit() {
    if (!this.order.length) return;
    this.backend.postOrder(this.order).then(response => {
      this.toasr.success(`Referencia ${response._id}`, 'Pedido generado correctamente')
      this.newOrder.emit(response)
    }).catch(error => {
      console.log(error);
    })
  }
}
