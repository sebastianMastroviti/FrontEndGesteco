import { Component, OnInit,OnDestroy } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from '../../models/Product';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit,OnDestroy {

  products: Product[] = [];
  private subscription: Subscription;

  constructor(private productService: ProductService) {
    this.productService.insertedProduct().subscribe(product => {
      this.getProducts();
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  getProducts(): void {
    this.productService.getProducts()
      .then(products => this.products = products);
  }

  onSelect(product: Product): void {
    this.productService.selectProduct(product);
  }

  ngOnInit() {
    this.getProducts();
  }

}
