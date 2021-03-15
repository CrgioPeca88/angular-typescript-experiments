// Depenencies
import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

// Assets
import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {

  const getByTestId = (id, compiled) => {
    return compiled.querySelector(`[data-test-id="${id}"]`);
  };

  const factory = (initial) => {
    const fixture: ComponentFixture<TimerComponent> = TestBed.createComponent(TimerComponent);
    const component: TimerComponent = fixture.componentInstance;
    component.initial = initial;
    const compiled = fixture.debugElement.nativeElement;
    const stopButton = getByTestId('stop-button', compiled);
    fixture.detectChanges();
    return {
      fixture,
      component,
      compiled,
      stopButton
    };
  };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [TimerComponent],
        schemas : [CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
  }));

  it('Should render the initial UI', fakeAsync(() => {
    const {compiled, stopButton} = factory(60);
    expect(getByTestId('timer-value', compiled).innerHTML).toEqual('60');
    expect(stopButton.innerHTML).toEqual('Stop Timer');
    stopButton.click();
  }));

  it('Should update the timer as expected', fakeAsync(() => {
    const {compiled, stopButton, fixture} = factory(120);
    expect(getByTestId('timer-value', compiled).innerHTML).toEqual('120');
    tick(5000);
    fixture.detectChanges();
    expect(getByTestId('timer-value', compiled).innerHTML).toEqual('115');
    stopButton.click();
  }));

  it('Should stop the timer at 0', fakeAsync(() => {
    const {compiled, stopButton, fixture} = factory(5);
    expect(getByTestId('timer-value', compiled).innerHTML).toEqual('5');
    tick(10000);
    fixture.detectChanges();
    expect(getByTestId('timer-value', compiled).innerHTML).toEqual('0');
    stopButton.click();
  }));

  it('Should stop the on clicking the stop button', fakeAsync(() => {
    const {compiled, stopButton, fixture} = factory(50);
    console.log(getByTestId('timer-value', compiled).innerHTML);
    expect(getByTestId('timer-value', compiled).innerHTML).toEqual('50');
    tick(10000);
    fixture.detectChanges();
    console.log(getByTestId('timer-value', compiled).innerHTML);
    expect(getByTestId('timer-value', compiled).innerHTML).toEqual('40');
    stopButton.click();
    fixture.detectChanges();
    console.log(getByTestId('timer-value', compiled).innerHTML);
    expect(getByTestId('timer-value', compiled).innerHTML).toEqual('40');
    tick(10000);
    fixture.detectChanges();
    console.log(getByTestId('timer-value', compiled).innerHTML);
    expect(getByTestId('timer-value', compiled).innerHTML).toEqual('40');
    stopButton.click();
    discardPeriodicTasks();
  }));
});
