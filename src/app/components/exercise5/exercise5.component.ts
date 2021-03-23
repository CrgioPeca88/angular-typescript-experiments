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
type Credentials = {
  token: string,
  role?: string
}
type UserLogged = User & Credentials;
type ITwoTypes = <X,Y>(x:X, y:Y) => X & Y;

@Component({
  selector: 'app-exercise5',
  templateUrl: './exercise5.component.html'
})
export class Exercise5Component {

  constructor() {}

  ngOnInit() {
    this.patternTest();
    this.aliasTest();
    this.keyofTest();
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
    // ALIAS - EXPERIMENT
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
    // ALIAS INTERSECTION - EXPERIMENT
    const intersectionUser: UserLogged = {
      lastName: "Peca",
      email: "cp@email.com",
      nickName: "CrgioPeca88",
      age: 88,
      token: "747832467438734uhfhj.747834.bhjdhjbfdbhj"
    }
    console.log(`%c Alias Intersection => ${intersectionUser.nickName} - ${intersectionUser.token}`, `background-color: yellow; color: black`);
    // ALIAS INTERSECTION + GENERIC TYPES - EXPERIMENT
    const compose: ITwoTypes = <X, Y>(typeX: X, typeY: Y): X & Y => ({...typeX, ...typeY});
    const user: User = {
      name: "Angiesita",
      lastName: "GR",
      email: "angiesita@email.com",
      nickName: "angiesita10",
      age: 10
    }
    const credentials: Credentials = {
      token: "34732987342987.bfdsbhjbjhfds.7834278342897",
      role: "User"
    }
    const userLogged: UserLogged = compose<User, Credentials>(user, credentials);
    console.log(`%c Alias Intersection + Generic Types =>`, `background-color: black; color: yellow`, userLogged);
    // ALIAS UNION + GUARDS - EXPERIMENT
    interface Vehicle {
      vehicleType: string;
      brand: string;
      model: string;
      start({vehicleType, brand, model}): void;
    }
    interface Motorcycle extends Vehicle {
      quickshifter: boolean
    }
    interface Car extends Vehicle {
      trunkLength: number
    }

    const getMotorcycle: () => Motorcycle = () => ({
      vehicleType: "Moto",
      brand: "Kawasaki",
      model: "Ninja ZX10R",
      quickshifter: true,
      start: ({vehicleType, brand, model}) => console.log(`Starting... ${vehicleType} ${brand} ${model}`)
    });

    const getCar: () => Car = () => ({
      vehicleType: "Car",
      brand: "Ford",
      model: "Fsuion",
      trunkLength: 100,
      start: ({vehicleType, brand, model}) => console.log(`Starting... ${vehicleType} ${brand} ${model}`)
    });

    const getRandomVehicle: () => Motorcycle | Car = (): Motorcycle | Car => {
      return (Math.random() * 10 > 5) ? getMotorcycle() : getCar();
    }

    const newVehicle: Vehicle = getRandomVehicle();

    if(`quickshifter` in newVehicle) {
      console.log(`%c Alias Union + Guards => el vehiculo es una Moto`, `background-color: red; color: white`, newVehicle);
    } else {
      console.log(`%c Alias Union + Guards => el vehiculo es un Carro`, `background-color: red; color: white`, newVehicle);
    }
  }

  private keyofTest(): void {
    
  }

}
