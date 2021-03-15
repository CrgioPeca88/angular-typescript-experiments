// Dependencies
import { Component } from '@angular/core';

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html'
})
export class Exercise2Component {

  public colorOptions: string[];
  public initialColor: string;

  constructor() {
      this.colorOptions = ['#5d77f5', '#0fd085', '#ffba5b', '#f95e62', 'lightpink'];
      this.initialColor = 'black';
  }

}
