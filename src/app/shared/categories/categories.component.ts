import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Output() newCategory: EventEmitter<any>;
  categories: any[];

  constructor(
    private backend: BackendService
  ) {
    this.newCategory = new EventEmitter()
  }



  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.backend.getCategories()
    .then(response => this.categories = response)
    .catch(error => {
      console.error(error.error);
    })
  }
  onChangeCategory(event) {
    console.log(event);
    // enviar al padre para que haga las respectivas consultas
    this.newCategory.emit(event);
  }

}
