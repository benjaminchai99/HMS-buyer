import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../../services/product.service";
import { Product } from "../../../classes/product";
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-cart-variation',
  templateUrl: './cart-variation.component.html',
  styleUrls: ['./cart-variation.component.scss']
})
export class CartVariationComponent implements OnInit, OnDestroy {

  @Input() direction: string = 'right'; // Default Direction Right

  public products: Product[] = [];
  public serverIP = environment.serverIP

  constructor(public productService: ProductService) {
    this.productService.cartItems.subscribe(response => {
      
      this.products = response});
  }

  ngOnInit(): void {
    console.log('response:', this.products)
    this.productService.OpenCart = false;
  }

  closeCart() {
    this.productService.OpenCart = false;
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  ngOnDestroy(): void {
    this.closeCart();
  }

}
