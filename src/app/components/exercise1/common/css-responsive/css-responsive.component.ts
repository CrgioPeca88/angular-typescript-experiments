import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'css-responsive',
  templateUrl: './css-responsive.component.html',
  styleUrls: ['./css-responsive.component.css']
})
export class CssResponsiveTestComponent implements OnInit {

  @ViewChild('myAnimation', { static: true }) myAnimation;
  private _pos: number;
  private _id: any;
  private _running: boolean
  private _frame: () => void;

  constructor() {
    this._pos = 0;
    this._running = true;
    this._frame = this.getFrame();
  }

  ngOnInit() {
    this._id = this.start();
    this.javascriptExperiments();
  }

  private getFrame(): () => void {
    return (() => {
      this._pos = (this._pos === 350) ? 0 : this._pos + 1;
      this.myAnimation.nativeElement.style.top = this._pos + 'px';
      this.myAnimation.nativeElement.style.left = this._pos + 'px';
    });
  }

  private start(): any {
    return setInterval(this._frame, 10);
  }


  public ppButton(): void {
    if (this._running) {
      this._running = false;
      clearInterval(this._id);
    } else {
      this._running = true;
      this._id = this.start();
    }
  }

  //======================JS CODE===============================================

  /*let elem = document.getElementById("myAnimation");
  let ppButton = document.getElementById("stopButton");
  let running = true;
  let pos = 0;
  let id = start();

  function start() {
    return setInterval(frame, 1);
  }

  function frame() {
    pos = (pos === 350) ? 0 : pos + 1;
    elem.style.top = pos + 'px';
    elem.style.left = pos + 'px';
  }

  ppButton.onclick = () => {
    if (running) {
      running = false;
      clearInterval(id);
    } else {
      running = true;
      id = start();
    }
  }*/

  private javascriptExperiments(): void {
    function sum(numberList) {
      let total = 0;
      numberList.forEach(function(element) {
        total = total + element;
      })
      return total;
    }
    const n1 = 8;
    console.log(sum([n1, 10, 32]));

  //============================================================================

    function correr(direccion) {
      return `Test THIS -> ${this.name} corre hacia el ${direccion}`;
    }

    console.log(correr.apply({name: 'sergio'},['Norte']));
    console.log(correr.call({name: 'peca'}, 'Sur'));
    const bind = correr.bind({name: 'peca'}, 'Sur');
    console.log(bind());

  //============================================================================
    console.log("_______ Test Prototype _________");
    function Motorcycle(brand, model){
      const moto = Object.create(Motorcycle.prototype);
      moto.brand = brand;
      moto.model = model;
      return moto;
    }

    Motorcycle.prototype.start = function() {
      console.log(`Arrancando moto ${this.brand} ${this.model}`);
    }

    const moto1 = Motorcycle('Kawasaki', 'Ninja ZX10R');
    moto1.start();
    console.log(moto1);

    console.log("_______ Test Prototype 2 _________");

    function Motorcyclee(brand, model){
      this.brand = brand;
      this.model = model;
    }

    Motorcyclee.prototype.start = function() {
      console.log(`Arrancando moto ${this.brand} ${this.model}`);
    }

    const moto2 = new Motorcyclee('Ducati', 'Panigale V4R');
    moto2.start();
    console.log(moto2);

//==============================================================================
    console.log("_______ Herencia Prototypal _________");

    function Vehiculo(marca) {
      this.marca = marca;
    }

    Vehiculo.prototype.encender = function() {
      console.log(`Encendiendo vehiculo ${this.marca}`);
    }

    function Motocicleta(modelo, marca) {
      Vehiculo.call(this, marca);
      this.modelo = modelo;
    }

    Motocicleta.prototype = Object.create(Vehiculo.prototype, {
      encender: {
        value: function() {
          console.log(`Encendiendo motocicleta ${this.marca} ${this.modelo}`);
        }
      }
    });

    const m = new Motocicleta(`Ninja ZX10RR`, `Kawasaki`);
    m.encender();
    console.log(m);
    
  };

}
