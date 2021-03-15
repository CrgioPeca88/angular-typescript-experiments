// Dependencies
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

// Assets
import {Product, UpdateMode} from "../../models";

@Component({
  selector: 'cs-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[];
  @Output() onAddToCart: EventEmitter<Product> = new EventEmitter();
  @Output() onQuantityUpdate: EventEmitter<Product> = new EventEmitter();

  ngOnInit() {}

  public add(product: Product): void {
    product.cartQuantity++;
    this.onQuantityUpdate.emit(product);
  }

  public remove(product: Product): void {
    product.cartQuantity--;
    this.onQuantityUpdate.emit(product);
  }

  public addCart(product: Product): void {
    this.onAddToCart.emit(product);
  }
}
