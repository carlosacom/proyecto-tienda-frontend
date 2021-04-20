import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = environment.backend
  }

  private postQuery(query: string, data: any): any {
    const url = this.url + query;
    let headers: HttpHeaders;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(url, data, { headers }).pipe(
      catchError(err => this.catchError(err))
    ).toPromise();
  }
  private putQuery(query: string, data: any): any {
    const url = this.url + query;
    let headers: HttpHeaders;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(url, data, { headers }).pipe(
      catchError(err => this.catchError(err))
    ).toPromise();
  }
  private getQuery(query: string): any {
    const url = this.url + query;
    let headers: HttpHeaders;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(url, { headers }).pipe(
      catchError(err => this.catchError(err))
    ).toPromise();
  }

  private catchError(err: any) {
    return throwError(err.error.errors);
  }

  getCategories = () => this.getQuery('/category');
  getProducts = category => this.getQuery(`/product-category/${ category }`);
  postOrder = dataOrder => this.postQuery('/order', dataOrder);
  postOrderConfirmation = (order, dataConfirmation) => this.putQuery(`/order/confirmation/${ order }`, dataConfirmation)
}
