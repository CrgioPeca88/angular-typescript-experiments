// Dependencies
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Observable, of, fromEvent } from 'rxjs';
import { exhaustMap, map, tap } from 'rxjs/operators';

// Assets
import { TeamsChannelService, FormControls, PATTERN_CONTAIN_STRINGS } from '../../services/teams-channels.service';

export class Team {
  channels: Channel[];
  name: String
}

export class Channel {
  name: string;
  index: number;
}

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamList implements OnInit, AfterViewInit {

  @ViewChild('addTeamButton') addTeamButton: ElementRef;
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

  ngAfterViewInit() {
    this.addTeam();
  }

  private newTeam(name: string): Team {
    return {
      channels: [],
      name: name
    }
  }

  private addTeam(): void {
    fromEvent(this.addTeamButton.nativeElement, 'click').pipe(
      exhaustMap(n                        => this.teamsChannelService.formValidation(this.teamFormGroup)),
      exhaustMap((controls: FormControls) => this.teamsChannelService.updateListElements<Team>(this.teams, this.newTeam(controls.team.value)))
    ).subscribe((res: Team[]) => {
      this.teams = [...res];
    }, error => {
      console.log("Error", error);
    });
  }

}
