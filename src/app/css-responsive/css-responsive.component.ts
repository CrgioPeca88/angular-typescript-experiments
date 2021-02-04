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

}
