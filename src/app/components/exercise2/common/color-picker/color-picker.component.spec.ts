import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ColorPickerComponent} from './color-picker.component';

describe('ColorPickerComponent', () => {

  const getByTestId = (id, compiled) => {
    return compiled.querySelector(`[data-test-id="${id}"]`);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorPickerComponent],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  const factory = (initialColor, colorOptions) => {
    const fixture: ComponentFixture<ColorPickerComponent> = TestBed.createComponent(ColorPickerComponent);
    const component: ColorPickerComponent = fixture.componentInstance;
    component.colorOptions = colorOptions;
    component.initialColor = initialColor;
    const compiled = fixture.debugElement.nativeElement;
    const getSelectedColor = () => getByTestId('selectedColor', compiled);
    fixture.detectChanges();
    return {
      fixture,
      component,
      compiled,
      getSelectedColor
    };
  };

  it('Should render Initial UI', async () => {
    const colors = ['red', 'blue', 'green'];
    const {compiled, fixture, getSelectedColor} = factory('blue', colors);
    await fixture.whenStable();
    expect(getSelectedColor().style.backgroundColor).toEqual('blue');
    const colorOptions = getByTestId('colorPickerOptions', compiled);
    expect(colorOptions.children.length).toEqual(3);
    Array.from(colorOptions.children).forEach((node: HTMLElement, i) => {
      expect(node.style.backgroundColor).toEqual(colors[i]);
    });
  });

  it('Clicking on color changes the color of the div - 1', async () => {
    const colors = ['red', 'blue', 'green', 'orange'];
    const {compiled, fixture, getSelectedColor} = factory('green', colors);
    await fixture.whenStable();
    expect(getSelectedColor().style.backgroundColor).toEqual('green');
    const colorOptions = getByTestId('colorPickerOptions', compiled);
    const children: HTMLElement[] = Array.from(colorOptions.children);
    children[0].click();
    fixture.detectChanges();
    expect(getSelectedColor().style.backgroundColor).toEqual('red');
  });

  it('Clicking on color changes the color of the div - 2', async () => {
    const colors = ['red', 'olive', 'green', 'orange'];
    const {compiled, fixture, getSelectedColor} = factory('yellow', colors);
    await fixture.whenStable();
    expect(getSelectedColor().style.backgroundColor).toEqual('yellow');
    const colorOptions = getByTestId('colorPickerOptions', compiled);
    const children: HTMLElement[] = Array.from(colorOptions.children);
    children[1].click();
    fixture.detectChanges();
    expect(getSelectedColor().style.backgroundColor).toEqual('olive');
  });

  it('Clicking on color changes the color of the div - 3', async () => {
    const colors = ['red', 'olive', 'lime', 'orange'];
    const {compiled, fixture, getSelectedColor} = factory('lightpink', colors);
    await fixture.whenStable();
    expect(getSelectedColor().style.backgroundColor).toEqual('lightpink');
    const colorOptions = getByTestId('colorPickerOptions', compiled);
    const children: HTMLElement[] = Array.from(colorOptions.children);
    children[2].click();
    fixture.detectChanges();
    expect(getSelectedColor().style.backgroundColor).toEqual('lime');
  });

  it('Clicking on color changes the color of the div - 4', async () => {
    const colors = ['red', 'olive', 'lime', 'white'];
    const {compiled, fixture, getSelectedColor} = factory('black', colors);
    await fixture.whenStable();
    expect(getSelectedColor().style.backgroundColor).toEqual('black');
    const colorOptions = getByTestId('colorPickerOptions', compiled);
    const children: HTMLElement[] = Array.from(colorOptions.children);
    children[3].click();
    fixture.detectChanges();
    expect(getSelectedColor().style.backgroundColor).toEqual('white');
  });
});
