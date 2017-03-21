import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Product, marcas } from '../../models/Product';
import { ProductService } from '../shared/product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnDestroy {

  productForm: FormGroup;
  marcas = marcas;
  private subscription: Subscription;
  isNewProduct: boolean = true;
  private product: Product;
  private marcaControl: FormControl;
  private modeloControl: FormControl;
  private serieControl: FormControl;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.createForm();

    productService.selectedProduct().subscribe(product => {
      if (product._id) {//me aseguro que es un producto en DB
        this.product = product;
        this.productForm.setValue({
          'marca': product.marca,
          'modelo': product.modelo,
          'serie': product.serie,
          'tension': product.tension || 0,
          'proveedor': product.proveedor || ''
        });
        this.isNewProduct = false;
        this.marcaControl.disable();
        this.modeloControl.disable();
        this.serieControl.disable();
      } else alert('no hay producto');
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }// prevent memory leak when component destroyed

  createForm() {
    this.marcaControl = this.fb.control({ value: '', disabled: false }, Validators.required);
    this.modeloControl = this.fb.control({ value: '', disabled: false }, Validators.required);
    this.serieControl = this.fb.control({ value: '', disabled: false }, Validators.required);

    this.productForm = this.fb.group({
      'marca': this.marcaControl,
      'modelo': this.modeloControl,
      'serie': this.serieControl,
      'tension': '',
      'proveedor': ''
    });
  }

  addProduct(product: Product): void {
    this.productService.create(product)
      .then(res => console.log(res))//mostrar esta respuesta al usuario
      .catch(alert);
  }

  onSubmit(): void {
    if (this.isNewProduct) {
      if (this.productForm.status === 'VALID') {
        this.product = this.productForm.value;
        this.addProduct(this.product);
      } else
        alert('completar campos.Mejorar esto');
    } else {
      this.product.tension = this.productForm.get('tension').value as number;
      this.product.proveedor = this.productForm.get('proveedor').value as string;
      this.updateProduct(this.product);
    }

  }

  updateProduct(product: Product): void {
    this.productService.update(product)
      .then(res => console.log(res))
      .catch(alert);
  }

  /*prepareSaveProduct():Product{
    if (this.productForm.status === 'VALID') {
        let product: Product = this.productForm.value;
      }
  }*/

  reset(): void {
    this.productForm.reset(); 
    this.isNewProduct = true; 
    this.marcaControl.enable();
    this.modeloControl.enable();
    this.serieControl.enable();
    
  }




}
