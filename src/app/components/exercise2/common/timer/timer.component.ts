// Depenencies
import {Component, Input, OnInit} from '@angular/core';
import { BehaviorSubject, Subscription, interval } from 'rxjs';
import { take, tap } from "rxjs/operators";

@Component({
  selector: 'app-exercise2-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @Input() initial: number;
  public timer$: BehaviorSubject<number>;
  private paused: boolean;
  private intervalSubs: Subscription;

  constructor() {
    this.paused = false;
  }

  ngOnInit() {
    this.timer$ = new BehaviorSubject(this.initial);
    this.startTimer(this.initial);
  }

  private startTimer(initial: number): void {
    this.intervalSubs = interval(1000).pipe(
      take(initial),
      tap(n => this.timer$.next(this.timer$.getValue() - 1))
    ).subscribe();
  }

  public stopTimer(): void {
    this.paused = !this.paused;
    if(this.paused) {
      this.intervalSubs.unsubscribe();
    } else {
      this.startTimer(this.timer$.getValue());
    }
  }

}
