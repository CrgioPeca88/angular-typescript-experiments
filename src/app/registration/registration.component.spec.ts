import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RegistrationComponent } from './registration.component';
import { FormsModule } from '@angular/forms';
import { AppService } from 'app/app.service';

describe('RegistrationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegistrationComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        AppService
      ]
    }).compileComponents();
  }));

  it('should generate list on button click', async(() => {
    const fixture = TestBed.createComponent(RegistrationComponent);
    const sc = fixture.componentInstance;
    fixture.detectChanges();
    sc.names = "Sergio\nPeña\nCardozo";
    sc.dates = "2020-12-08 to 2020-12-10\n2020-12-08 to 2020-12-10\n2020-12-08 to 2020-12-10\n2020-12-08 to 2020-12-10";
    fixture.detectChanges();

    const but = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
    but.click();
    fixture.detectChanges();
    expect(sc.items).toEqual([{
      name: 'Sergio',
      date: '2020-12-08 ',
      mealType: 'breakfast'
    }, {
      name: 'Sergio',
      date: '2020-12-08 ',
      mealType: 'lunch'
    }, {
      name: 'Sergio',
      date: '2020-12-08 ',
      mealType: 'dinner'
    }, {
      name: 'Peña',
      date: '2020-12-08 ',
      mealType: 'breakfast'
    }, {
      name: 'Peña',
      date: '2020-12-08 ',
      mealType: 'lunch'
    }, {
      name: 'Cardozo',
      date: '2020-12-08 ',
      mealType: 'breakfast'
    }, {
      name: 'Cardozo',
      date: '2020-12-08 ',
      mealType: 'dinner'
    }, {
      name: 'Sergio',
      date: '2020-12-09 ',
      mealType: 'breakfast'
    }, {
      name: 'Peña',
      date: '2020-12-09 ',
      mealType: 'breakfast'
    }, {
      name: 'Peña',
      date: '2020-12-09 ',
      mealType: 'lunch'
    }, {
      name: 'Cardozo',
      date: '2020-12-09 ',
      mealType: 'dinner'
    }, {
      name: 'Sergio',
      date: '2020-12-10 ',
      mealType: 'breakfast'
    }, {
      name: 'Peña',
      date: '2020-12-10 ',
      mealType: 'lunch'
    }, {
      name: 'Cardozo',
      date: '2020-12-10 ',
      mealType: 'dinner'
    }]);
  }));

});
