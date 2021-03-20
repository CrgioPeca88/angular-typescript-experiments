interface Observer {
  update: (data: any) => void;
}

interface Subject {
 subscribe: (observer: Observer) => void;
 unsubscribe: (observer: Observer) => void;
}

export class Price implements Subject {

  private _observers: Observer[] = [];
  public _inputElement: HTMLInputElement;

  constructor() {
    this._inputElement = document.querySelector("#price-input");
    this.initElemDOMEvents();
  }

  private initElemDOMEvents(): void {
    this._inputElement.addEventListener('input', () => {
      this.notify(this._inputElement.value);
    });
  }

  public subscribe(observer: Observer): void {
    this._observers.push(observer)
  }

  public unsubscribe(observer: Observer): void {
    const index: number = this._observers.findIndex(obs => obs === observer);
    this._observers.splice(index, 1);
  }

  public notify(data: any) {
    this._observers.forEach(observer => observer.update(data));
  }

}

export class PriceDisplay implements Observer {

  public _inputElement: HTMLInputElement;

  constructor(elementName: string) {
    this._inputElement = document.querySelector(`#${elementName}`);
  }

  public update(data: any): void {
    this._inputElement.innerText = data;
  }
}
