// Dependencies
import { Component } from '@angular/core';
import { Observable, of, pipe, from } from 'rxjs';
import { map, filter, exhaustMap, isEmpty } from 'rxjs/operators';

// Assets
import { Cart, CartItem, Product } from "./models";

export const PRODUCTS: Product[] = [
  {
    name: "Cap",
    price: 5
  },
  {
    name: "HandBag",
    price: 30
  },
  {
    name: "Shirt",
    price: 35
  },
  {
    name: "Shoe",
    price: 50
  },
  {
    name: "Pant",
    price: 35
  },
  {
    name: "Slipper",
    price: 25
  }
];

@Component({
  selector: 'exercise3-cart-shop',
  templateUrl: './cart-shop.component.html',
  styleUrls: ['./cart-shop.component.css']
})
export class CartShopComponent {

  public products: Product[];
  public cart: Cart;

  constructor() {
    this.cart = {
      items: []
    } as Cart;
  }

  ngOnInit() {
    this.products = [...PRODUCTS].map((product, index) => {
      product.id = index + 1;
      product.image = `/assets/img/items/${product.name.toLocaleLowerCase()}.png`;
      product.cartQuantity = 0;
      return product;
    });
  }

  private transFromProductToCartItem(product: Product): CartItem {
    return {
      id: product.id,
      item: product.name,
      quantity: product.cartQuantity,
    };
  }

  private validateQuantity(product: Product, minValue: number): Observable<Product> {
    if(product.cartQuantity < minValue) {
      throw new Error("Error al agregar, adicione cantidad!");
    } else {
      return of(product);
    }
  }

  private validateProductDoesntExist(product: Product, itemsCart: CartItem[]): Observable<boolean> {
    return from(itemsCart).pipe(
      filter((ci: CartItem) => ci.item === product.name),
      isEmpty(),
    );
  }

  private addItemUpdatedToCart(
    productDoesntExist: boolean,
    product: Product,
    itemsCart: CartItem[]
  ): Observable<CartItem[]> {
    if(!productDoesntExist) {
      return of(itemsCart).pipe(
          map((itemsCart: CartItem[]) => {
            return itemsCart.map((ic: CartItem) =>((ic.id === product.id) ? this.transFromProductToCartItem(product) : ic));
          })
      );
    } else { return of(itemsCart); }
  }

  private addItemToCart(productDoesntExist: boolean, product: Product): Observable<Product> {
    if(productDoesntExist) {
      return of(product);
    }
  }

  private handleError(error: Error): void {
    switch (error.message) {
      case 'Error al agregar, adicione cantidad!':
        console.log("ERROR", error.message);
        break;
      default:
        break;
    }
  }

  addToCart(product: Product) {
      of(null).pipe(
        exhaustMap(empty => this.validateQuantity(product, 1)),
        exhaustMap(p => this.validateProductDoesntExist(p, this.cart.items)),
        exhaustMap(pde   => this.addItemToCart(pde, product))
      ).subscribe((product: Product) => {
        this.cart.items.push(this.transFromProductToCartItem(product));
      }, (error: Error) => {
        this.handleError(error);
      });
  }

  updateCart(product: Product) {
    of(null).pipe(
      exhaustMap(empty => this.validateQuantity(product, 0)),
      exhaustMap(p => this.validateProductDoesntExist(p, this.cart.items)),
      exhaustMap(pde => this.addItemUpdatedToCart(pde, product, this.cart.items))
    ).subscribe((cartItemsUpdated: CartItem[]) => {
      this.cart.items = cartItemsUpdated;
    });
  }

}
