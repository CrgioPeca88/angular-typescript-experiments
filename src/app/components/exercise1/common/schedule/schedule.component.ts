// Dependencies
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy,
   ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

// Assets
import { RowMealClients } from 'app/components/exercise1/common/registration/registration.component';
import { AppService } from 'app/app.service';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnInit, OnDestroy {

  private dataMenuBS: BehaviorSubject<RowMealClients[]>;
  private dataMenuSubscription: Subscription;
  public itemsList: RowMealClients[];

  constructor(
    public appService: AppService,
    public cdr: ChangeDetectorRef
  ) {
    this.dataMenuBS = this.appService.getDataMenuBS();
  }

  ngOnInit() {
    this.dataMenuSubscription = this.dataMenuBS.subscribe( (data: RowMealClients[]) => {
			this.itemsList = data;
      this.cdr.detectChanges();
		});
  }

  ngOnDestroy() {
    this.dataMenuSubscription.unsubscribe();
  }



}
