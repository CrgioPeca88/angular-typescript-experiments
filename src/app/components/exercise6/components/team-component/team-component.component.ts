import { Component, OnInit, Input } from '@angular/core';
import { Team, Channel } from '../team-list/team-list.component';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { TeamsChannelService, FormControls, PATTERN_CONTAIN_STRINGS } from '../../services/teams-channels.service';

@Component({
  selector: 'app-team-component',
  templateUrl: './team-component.component.html',
  styleUrls: ['./team-component.component.css']
})
export class TeamComponent implements OnInit {
  // IMP - Implement addChannel and removeChannel operations within this component
  @Input() team: Team;
  @Input() teamIndex: number;
  currentIndex: number;
  currentState: number;
  public channelFormGroup: FormGroup;
  public ascSort: (e1: Channel, e2: Channel) => number;
  public descSort: (e1: Channel, e2: Channel) => number;
  private sortFlag: number;
  public originalState: Team;

  constructor(
    private formBuilder: FormBuilder,
    private teamsChannelService: TeamsChannelService
  ) {
    this.sortFlag = 0;
    this.channelFormGroup = this.formBuilder.group({
			'channel': ['', [
				Validators.required,
        Validators.pattern(PATTERN_CONTAIN_STRINGS)
			]]
		});
    this.ascSort = (e1: Channel, e2: Channel) => {
      if (e1.name < e2.name) { return -1; }
      else if (e1.name > e2.name) { return 1; }
      else { return 0; }
    };
    this.descSort = (e1: Channel, e2: Channel) => {
      if (e1.name > e2.name) { return -1; }
      else if (e1.name < e2.name) { return 1; }
      else { return 0; }
    };
  }

  ngOnInit() {
    this.originalState = {...this.team};
  }

  removeChannel(channelToRem: Channel): void {
    of(null).pipe(
      exhaustMap(n => this.getChannelsAfterRemove(this.team.channels, channelToRem))
    ).subscribe((response: Channel[]) =>{
      this.team.channels = [...response];
      this.originalState.channels = [...response];
    });
  }

  private getChannelsAfterRemove(channels: Channel[], channelToRem: Channel): Observable<Channel[]> {
    return of(channels).pipe(
      map((cl: Channel[]) => cl.filter((c: Channel) => c.index !== channelToRem.index))
    );
  }

  private newChannel(name: string, index: number): Channel {
    return {
      name: name,
      index: index
    }
  }

  private getNextIndexChannel(channels: Channel[], channelName: string): Observable<[string, number]> {
    return of(channels).pipe(
     map((c: Channel[]) => {
       const index: number = c.reduce((acc, value) => {
         return (value.index > acc) ? value.index : acc;
       }, 1);
       return [channelName, index + 1];
     })
   );
  }

  addChannel(channels: Channel[]): void {
    of(null).pipe(
      exhaustMap(n                                   => this.teamsChannelService.formValidation(this.channelFormGroup)),
      exhaustMap((controls: FormControls)            => this.getNextIndexChannel(channels, controls.channel.value)),
      exhaustMap((newChannelTuple: [string, number]) => this.teamsChannelService.updateListElements<Channel>(channels, this.newChannel(newChannelTuple[0], newChannelTuple[1])))
    ).subscribe((res: Channel[]) => {
      this.team.channels = this.getElementsSorted(this.sortFlag, [...res]);
      this.originalState.channels = [...res];
    }, error => {
      console.log("Error", error);
    });
  }

  private getElementsSorted(sortFlag: number, elements: Channel[]): Channel[] {
    if(sortFlag === 1) {
      return [...elements.sort(this.ascSort)];
    } else if(sortFlag === 2) {
      return [...elements.sort(this.descSort)];
    } else {
      return elements;
    }
  }

  private getSortFlag(currentSortF: number): number {
    return (currentSortF === 2) ? 0 : currentSortF + 1;
  }

  sort() {
    this.sortFlag = this.getSortFlag(this.sortFlag);
    this.team.channels = this.getElementsSorted(this.sortFlag, [...this.originalState.channels]);
  }

}
