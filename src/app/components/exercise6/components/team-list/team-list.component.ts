import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { TeamsChannelService, FormControls, PATTERN_CONTAIN_STRINGS } from '../../services/teams-channels.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamList implements OnInit {

  public teamFormGroup: FormGroup;
  public teams: Team[] = [];
  public component: Team;

  constructor(
    private formBuilder: FormBuilder,
    private teamsChannelService: TeamsChannelService
  ) {
    this.teams.push({
      name: 'Team1',
      channels: [{
        name: 'channel1',
        index: 1
      },
      {
        name: 'channel2',
        index: 2
      }]
    });
    this.teams.push({
      name: 'Team2',
      channels: [{
        name: 'channel1',
        index: 1
      },
      {
        name: 'channel2',
        index: 2
      }]
    });
  }

  ngOnInit() {
    this.teamFormGroup = this.formBuilder.group({
			'team': ['', [
				Validators.required,
        Validators.pattern(PATTERN_CONTAIN_STRINGS)
			]]
		});
  }

  private newTeam(name: string): Team {
    return {
      channels: [],
      name: name
    }
  }

  addTeam(): void {
    of(null).pipe(
      exhaustMap(n                        => this.teamsChannelService.formValidation(this.teamFormGroup)),
      exhaustMap((controls: FormControls) => this.teamsChannelService.updateListElements<Team>(this.teams, this.newTeam(controls.team.value)))
    ).subscribe((res: Team[]) => {
      this.teams = [...res];
    }, error => {
      console.log("Error", error);
    });
  }

  test(): void {
    console.log(this.teamFormGroup);
  }
}

export class Team {
  channels: Channel[];
  name: String
}

export class Channel {
  name: string;
  index: number;
}
