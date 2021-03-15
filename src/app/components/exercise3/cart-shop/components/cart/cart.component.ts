// Dependencies
import {Component, Input} from '@angular/core';

// Assets
import {Cart} from "../../models";

@Component({
  selector: 'cs-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() cart: Cart;

  constructor() {
  }

}
