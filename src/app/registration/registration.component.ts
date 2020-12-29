import { Component } from '@angular/core';
import { AppService } from 'app/app.service';

export interface RowMealClients {
  name: string;
  date: string;
  mealType: string;
}

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {

  public names: string;
  public dates: string;
  public items: RowMealClients[];
  public sort: (e1: RowMealClients, e2: RowMealClients) => number;
  private dataBaseMock: RowMealClients[];

  constructor(private appService: AppService) {
    this.sort = (e1: RowMealClients, e2: RowMealClients) => {
      if (new Date(e1.date).getTime() < new Date(e2.date).getTime()) {
        return -1;
      }
      if (new Date(e1.date).getTime() > new Date(e2.date).getTime()) {
        return 1;
      }
      return 0;
    };
    this.dataBaseMock = [{
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
    }]
  }

  private getItemsList(names: string[], dates: string[]): RowMealClients[] {
    let result: RowMealClients[] = [];
    names.forEach((name: string, index: number) => {
      const tmp: RowMealClients[] = [...this.dataBaseMock].filter((r: RowMealClients) => r.name === name);
      if (tmp && tmp.length > 0) {
        const tmpWithDates: RowMealClients[] = this.getItemsListByDates(tmp, dates[index]);
        result = result.concat(tmpWithDates);
      }
    });
    return result.sort(this.sort);
  }

  private getItemsListByDates(tmp: RowMealClients[], date: string): RowMealClients[] {
    const dates: string[] = date.split("to");
    const initialDate: Date = new Date(dates[0]);
    const endDate: Date = new Date(dates[1]);
    const tmpDates: RowMealClients[] = [...tmp].filter((r: RowMealClients) =>
      new Date(r.date).getTime() >= initialDate.getTime() && new Date(r.date).getTime() <= endDate.getTime()
    );
    if (tmpDates && tmpDates.length > 0) {
      return tmpDates;
    } else {
      return tmp;
    }
  }

  // ===========================================================================

  public generateList() {
   const namesList: string[] = this.names.split('\n');
   const datesList: string[] = this.dates.split('\n');
   this.items = this.getItemsList(namesList, datesList);
   this.appService.setNewData(this.items);
  }

}
