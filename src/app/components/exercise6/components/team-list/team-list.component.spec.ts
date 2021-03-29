import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {TeamList} from './team-list.component';
import {Team} from './team-list.component';
import {TeamComponent} from '../team-component/team-component.component';
import {ChangeDetectionStrategy, DebugElement, ElementRef, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TeamsChannelService } from '../../services/teams-channels.service';
let clone = require('clone');


describe('TeamList', () => {
  let component: TeamList;
  let fixture: ComponentFixture<TeamList>;
  const teams: Team[] = [{
    name: 'Team1',
    channels: [{
      name: 'Channel1',
      index: 1
    },
    {
      name: 'Channel2',
      index: 2
    }]
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamList, TeamComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        TeamsChannelService
      ]
    }).overrideComponent(TeamList, {
      set: {  changeDetection: ChangeDetectionStrategy.Default  }
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamList);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
  });

  it('teams and channel list should display first team by default along with required inputs and button', async(() => {
    component.teams = clone(teams);
    const nativeElement = fixture.nativeElement;
    fixture.detectChanges();
    const teamName = nativeElement.querySelector('.team-name');
    const channelSortButton = nativeElement.querySelector('.sort');
    const addChannelInput = nativeElement.querySelector('.add-channel input');
    const addChannelButton = nativeElement.querySelector('.add-channel button');
    fixture.whenStable().then(res => {
      expect(teamName).toBeTruthy();
      expect(teamName.innerHTML).toBe(teams[0].name);
      expect(channelSortButton).toBeTruthy();
      expect(channelSortButton.disabled).toBe(false);
      expect(addChannelInput).toBeTruthy();
      expect(addChannelButton).toBeTruthy();
      expect(addChannelButton.disabled).toBe(true);
    });
  }));

  it('teams and channel list should display first channel in team by default along with required buttons', async(() => {
    component.teams = clone(teams);
    const nativeElement = fixture.nativeElement;
    fixture.detectChanges();
    const channelName = nativeElement.querySelector('.channel-name span');
    const channelRemoveButton = nativeElement.querySelector('.channel-name button');
    fixture.whenStable().then(() => {
      expect(channelName).toBeTruthy();
      expect(channelName.innerHTML).toBe(teams[0].channels[0].name);
      expect(channelRemoveButton).toBeTruthy();
      expect(channelRemoveButton.disabled).toBeFalsy();
    });
  }));

  it('Add Team section should exist and add button should be disabled initially', async(() => {
    const nativeElement = fixture.nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const addTeam = nativeElement.querySelector('.add-team b');
      const addTeamButton = nativeElement.querySelector('.add-team button');
      expect(addTeam).toBeTruthy();
      expect(addTeam.innerHTML).toBe("Add Team");
      expect(addTeamButton.disabled).toBe(true);
    });
  }));

  it('Add Team button should not be enabled if data entered in input is empty or numeric', async(() => {
    const nativeElement = fixture.nativeElement;
    const addTeamInput = nativeElement.querySelector('.add-team input');
    const addTeamButton = nativeElement.querySelector('.add-team button');
    fixture.detectChanges();
    fixture.whenStable().then(res => {
      addTeamInput.value = "";
      addTeamInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(addTeamButton.disabled).toBe(true);
        addTeamInput.value = 1234;
        addTeamInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(addTeamButton.disabled).toBe(true);
        })
      })
    });
  }));

  it('Add Team button should be enabled if data entered in input is correct and clicking on button should add it to the list of teams', async(() => {
    const nativeElement = fixture.nativeElement;
    const addTeamInput = nativeElement.querySelector('.add-team input');
    const addTeamButton = nativeElement.querySelector('.add-team button');
    fixture.detectChanges();
    fixture.whenStable().then(res => {
      addTeamInput.value = "Team2";
      addTeamInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(addTeamButton.disabled).toBe(false);
        addTeamButton.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const teamNames = nativeElement.querySelectorAll('.team-name');
          expect(teamNames[1].innerHTML).toBe("Team2");
        });
      })
    });
  }));
});
