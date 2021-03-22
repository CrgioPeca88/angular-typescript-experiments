// Dependencies
import { Component } from '@angular/core';

// Assets
import Singleton from './patterns-test/Singleton';
import { Price, PriceDisplay } from './patterns-test/Observer';

// ALIAS
type OperationMath = (n1: number, n2: number) => number;
type User = {
  name?: string,
  lastName: string,
  email: string,
  nickName: string,
  age: number
}

@Component({
  selector: 'app-exercise5',
  templateUrl: './exercise5.component.html'
})
export class Exercise5Component {

  constructor() {}

  ngOnInit() {
    this.patternTest();
    this.aliasTest();
  }

  private patternTest(): void {
    const arrayTest: Array<string | number> = ["string1", "string2", "string3", 88];

    console.log(`arrayTest = `, arrayTest);

    // Singleton pattern example:

    const a = Singleton.getInstance();
    const b = Singleton.getInstance();

    console.log('SINGLETON TEST: A es igual a B? -> ', a === b);

    // Observer pattern example:

    const price: Price = new Price();
    const priceDisplay: PriceDisplay = new PriceDisplay(`price`);
    const priceDisplay2: PriceDisplay = new PriceDisplay(`price2`);
    const priceDisplay3: PriceDisplay = new PriceDisplay(`price3`);
    const priceDisplay4: PriceDisplay = new PriceDisplay(`price4`);
    const priceDisplay5: PriceDisplay = new PriceDisplay(`price5`);

    price.subscribe(priceDisplay);
    price.subscribe(priceDisplay2);
    price.subscribe(priceDisplay3);
    price.subscribe(priceDisplay4);
    price.subscribe(priceDisplay5);

    setTimeout(
      () => {
        price.unsubscribe(priceDisplay4);
        price.unsubscribe(priceDisplay5);
      },
      5000
    )
  }

  private aliasTest(): void {
    const sumar: OperationMath = (n1: number, n2: number) => {
      return n1 + n2;
    }
    const n1: number = 80;
    const n2: number = 8;
    console.log(`%c Sumar ${n1} + ${n2} = ${sumar(n1, n2)}`, `background-color: #026cb3; color: #fff`);
    const user1: User = {
      //name: "Crgio",
      lastName: "Peca",
      email: "cp@email.com",
      nickName: "CrgioPeca88",
      age: 88
    }
    console.log(`%c User alias => ${user1.nickName} - ${user1.email}`, `border: 1px solid #026cb3; color: #026cb3`);
  }

}
