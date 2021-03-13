// Dependencies
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Assets
import { RowMealClients } from './components/exercise1/common/registration/registration.component';

@Injectable()
export class AppService {

	private dataBS: BehaviorSubject<RowMealClients[]>;

	constructor() { }

  public setNewData(data: RowMealClients[]): void {
		this.dataBS.next(data);
	}

	public getDataMenuBS(): BehaviorSubject<RowMealClients[]> {
		if	(!this.dataBS) {
			this.dataBS = new BehaviorSubject<RowMealClients[]>([]);
		}
		return this.dataBS;
	}

}
