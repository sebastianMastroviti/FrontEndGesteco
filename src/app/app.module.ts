import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductsTableComponent } from './products/products-table/products-table.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

import { ProductService } from './products/shared/product.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsTableComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([/*routes*/])
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
