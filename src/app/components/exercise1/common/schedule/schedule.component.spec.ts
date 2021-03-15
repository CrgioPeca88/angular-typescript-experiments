// Dependencies
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Assets
import { AppService } from 'app/app.service';
import { RowMealClients } from 'app/components/exercise1/common/registration/registration.component';
import { ScheduleComponent } from './schedule.component';

describe('ScheduleComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScheduleComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        AppService
      ]
    }).compileComponents();
  }));

  it('should generate correct number of meals', waitForAsync( inject( [AppService], (appService) => {
    const fixture = TestBed.createComponent(ScheduleComponent);
    const sc = fixture.componentInstance;
    const data = [{
      name: 'Sergio',
      date: '2020-12-08 ',
      mealType: 'breakfast'
    }, {
      name: 'Cardozo',
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
      name: 'Cardozo',
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
      date: '2020-12-09 ',
      mealType: 'dinner'
    }, {
      name: 'Peña',
      date: '2020-12-09 ',
      mealType: 'breakfast'
    }, {
      name: 'Peña',
      date: '2020-12-09 ',
      mealType: 'lunch'
    }, {
      name: 'Sergio',
      date: '2020-12-09 ',
      mealType: 'breakfast'
    }, {
      name: 'Sergio',
      date: '2020-12-10 ',
      mealType: 'breakfast'
    }, {
      name: 'Cardozo',
      date: '2020-12-10 ',
      mealType: 'dinner'
    }, {
      name: 'Peña',
      date: '2020-12-10 ',
      mealType: 'lunch'
    }];
    sc.ngOnInit();
    fixture.whenStable().then(() => {
        appService.setNewData( data );
        return fixture.whenStable();
    }).then( ()=>{
      expect(sc.itemsList.length).toEqual(14);
      const li_len = fixture.debugElement.queryAll(By.css('li')).length;
      expect(li_len).toEqual(14);
    } );
  })));

  it('should generate correct number of days', waitForAsync( inject( [AppService], (appService) => {
    const fixture = TestBed.createComponent(ScheduleComponent);
    const sc = fixture.componentInstance;
    const data = [{
      name: 'Sergio',
      date: '2020-12-08 ',
      mealType: 'breakfast'
    }, {
      name: 'Cardozo',
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
      name: 'Cardozo',
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
      date: '2020-12-09 ',
      mealType: 'dinner'
    }, {
      name: 'Peña',
      date: '2020-12-09 ',
      mealType: 'breakfast'
    }, {
      name: 'Peña',
      date: '2020-12-09 ',
      mealType: 'lunch'
    }, {
      name: 'Sergio',
      date: '2020-12-09 ',
      mealType: 'breakfast'
    }, {
      name: 'Sergio',
      date: '2020-12-10 ',
      mealType: 'breakfast'
    }, {
      name: 'Cardozo',
      date: '2020-12-10 ',
      mealType: 'dinner'
    }, {
      name: 'Peña',
      date: '2020-12-10 ',
      mealType: 'lunch'
    }];
    sc.ngOnInit();
    fixture.whenStable().then(() => {
        appService.setNewData( data );
        return fixture.whenStable();
    }).then( ()=>{
      const div = fixture.debugElement.queryAll(By.css('div')).length;
      expect(div).toEqual(14);
    } );
  })));

  it('should not display anything if button is not clicked', waitForAsync(() => {
    const fixture = TestBed.createComponent(ScheduleComponent);
    const sc = fixture.componentInstance;
    fixture.detectChanges();
    const div = fixture.debugElement.queryAll(By.css('div')).length;
    expect(div).toEqual(0);
  }));
});
