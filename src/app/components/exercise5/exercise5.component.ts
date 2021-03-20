// Dependencies
import { Component } from '@angular/core';

// Assets
import Singleton from './patterns-test/Singleton';
import { Price, PriceDisplay } from './patterns-test/Observer';

@Component({
  selector: 'app-exercise5',
  templateUrl: './exercise5.component.html'
})
export class Exercise5Component {

  constructor() {}

  ngOnInit() {
    this.patternTest();
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

}
