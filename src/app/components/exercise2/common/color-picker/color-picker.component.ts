// Dependencies
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {
  @Input() colorOptions: string[];
  @Input() initialColor: string;
  public selectedColor : string;
  public colorsList : string[];

  constructor() {}

  ngOnInit(): void {
    this.selectedColor = this.initialColor;
  }

}
