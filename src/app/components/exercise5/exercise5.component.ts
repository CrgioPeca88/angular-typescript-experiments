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
    this.indexType();
    this.mappedType();
    this.typesConditionals();
    this.recursivity();
    this.utilitiesReadOnly();
    this.utilitiesPartial();
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
    interface Week {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
    }
    type Day = keyof Week;
    const day: Day = 'monday';
    console.log(`%c Keyof => day =`, `background-color: gray; color: greenyellow`, day);

    const showProps = <T>(obj: T, ...keys: (keyof T)[]): void => {
      keys.forEach(key => console.log(`%c Keyof => key =`, `background-color: gray; color: greenyellow`, obj[key]));
    }
    const developer = {
      type: 'Frontend',
      languajes: ['Js', 'Typescript', 'CSS'],
      seniority: "Junior"
    }
    showProps(developer, 'type', 'languajes');
  }

  private indexType(): void {
    const developer = {
      type: 'Frontend',
      languajes: ['Js', 'Typescript', 'CSS'],
      seniority: "Junior"
    }
    type DeveloperType = (typeof developer)['type'];
    const dType: DeveloperType = 'Front';
    console.log(`%c IndexType => DeveloperType =`, `background-color: greenyellow; color: black`, dType);
    interface Dev {
      type: string;
      languajes: string[];
      seniority: string;
    }
    type DevType = Dev['type'];
    const dType2: DevType = 'Back'
    console.log(`%c I IndexType => I DeveloperType =`, `background-color: greenyellow; color: black`, dType2);
  }

  private mappedType(): void {
    // Create a type from another element properties
    interface Dev {
      type: string;
      languajes: string[];
      seniority: string;
    }
    // ???
  }

  private typesConditionals(): void {
    type DarkColors = 'black' | 'gray' | 'darkred';
    type LigthColors = 'greenyellow' | 'white' | 'cyan' | 'magenta';
    type Theme = 'day' | 'night'

    type Palette<T extends Theme> = T extends 'day' ? LigthColors : DarkColors;

    const dayPrimaryColor: Palette<'day'> = 'greenyellow';
    console.log(`%c Types Conditionals => dayPrimaryColor =`, `background-color: magenta; color: black`, dayPrimaryColor);
  }

  private recursivity(): void {
    type IterableList<T> = T & { next?: IterableList<T> }

    interface Student {
      name: string;
    }

    let classroom: IterableList<Student> = {
      name: 'name1',
      next: {
        name: 'name2',
        next: {
          name: 'name3',
          next: {
            name: 'name4',
            next: {
              name: 'name5'
            }
          }
        }
      }
    }

    console.log(`%c Recursivity => classroom =`, `background-color: cyan; color: black`, classroom);

  }

  private utilitiesReadOnly(): void {
    interface Developer {
      name: string;
      languajes: {
        backend: string[],
        frontend: string[]
      };
      devopsTools: {
        versionControl: string[];
        ci: string[];
      };
    }

    type RODeveloper = Readonly<Developer>;
    type myRO<T> = {
      readonly [P in keyof T]: myRO<T[P]>;
    }

    let dev: RODeveloper = {
      name: 'Crgio Peca Readonly',
      languajes: {
        backend: ['scala', 'nodejs'],
        frontend: ['javascript', 'angular']
      },
      devopsTools: {
        versionControl: ['git'],
        ci: ['jenkins']
      }
    }

    let dev2: myRO<Developer> = {
      name: 'Crgio Peca',
      languajes: {
        backend: ['scala', 'nodejs'],
        frontend: ['javascript', 'angular']
      },
      devopsTools: {
        versionControl: ['git'],
        ci: ['jenkins']
      }
    }

    //dev.name = 'Peca 88'; <-- Readonly Error
    dev.languajes.frontend.push('react');

    //dev2.name = 'Peca 88'; <-- Readonly Error
    //dev2.languajes.frontend = ['Svelte', 'Css']; <-- Readonly Error
    //dev2.languajes.frontend.push('react'); <-- Readonly Error

    console.log(`%c Utilities readonly => developer =`, `background-color: pink; color: black`, dev);
  }

  private utilitiesPartial(): void {
    interface Developer {
      name: string;
      languajes: {
        backend: string[],
        frontend: string[]
      };
      devopsTools: {
        versionControl: string[];
        ci: string[];
      };
    }

    type PartialDeveloper = Partial<Developer>;

    const devopsTools: PartialDeveloper = {
      devopsTools: {
        versionControl: ['git'],
        ci: ['jenkins']
      }
    };
    const languajes: PartialDeveloper = {
      languajes: {
        backend: ['scala', 'nodejs'],
        frontend: ['javascript', 'angular']
      }
    };
    const devInfo: PartialDeveloper = {
      name: 'CrgioPeca Partial'
    };
    const developer: Developer = {
      ...devInfo, ...languajes, ...devopsTools
    } as Developer;

    console.log(`%c Utilities partial => developer =`, `background-color: purple; color: white`, developer);
  }

}
