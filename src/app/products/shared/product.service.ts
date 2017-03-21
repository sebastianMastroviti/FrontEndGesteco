import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Product } from '../../models/Product';
import { BehaviorSubject } from "rxjs/BehaviorSubject"

@Injectable()
export class ProductService {

  private url: string = 'http://localhost:3000/product';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private selectedProduct$ = new BehaviorSubject<Product>(new Product());
  private insertedProduct$ = new BehaviorSubject<Product>(new Product());

  constructor(private http: Http) { }

  getProducts(): Promise<Product[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(res => res.json().products as Product[])
      .catch(this.handleError);
  }

  create(product: Product): Promise<any> {
    return this.http
      .post(this.url, JSON.stringify(product), { headers: this.headers })
      .toPromise()
      .then(res => {
        this.insertProduct(product);
        return res.json().msj;
      })
      .catch(this.handleError);
  }

  update(product: Product): Promise<any> {
    const url = this.url + '/' + product._id;
    return this.http
      .put(url, JSON.stringify(product), { headers: this.headers })
      .toPromise()
      .then(res => res.json().msj)
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('an error occured', error);
    return Promise.reject(error.message || error);
  }

  selectProduct(product: Product): void {
    this.selectedProduct$.next(product);
  }

  selectedProduct(): BehaviorSubject<Product> {
    return this.selectedProduct$;
  }

  insertProduct(product: Product): void {
    this.insertedProduct$.next(product);
  }
  insertedProduct(): BehaviorSubject<Product> {
    return this.insertedProduct$;
  }



}
