import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {TeamList} from '../team-list/team-list.component';
import {Team} from '../team-list/team-list.component';
import {TeamComponent} from './team-component.component';
import {ChangeDetectionStrategy, DebugElement, ElementRef, Input} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
let clone = require('clone');
import { TeamsChannelService } from '../../services/teams-channels.service';


describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;
  const team: Team = {
    name: 'Team1',
    channels: [{
      name: 'Channel2',
      index: 1
    },
    {
      name: 'Channel1',
      index: 2
    },
    {
      name: 'Channel3',
      index: 3
    }]
  };
  const teamIndex = 0;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        TeamsChannelService
      ]
    }).overrideComponent(TeamComponent, {
      set: {  changeDetection: ChangeDetectionStrategy.Default  }
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    component.team = clone(team);
    component.teamIndex = teamIndex;
    fixture.autoDetectChanges(true);
  });

  it('it should display correct channels name along with remove button', async(() => {
    const nativeElement = fixture.nativeElement;
    fixture.detectChanges();
    const channelName = nativeElement.querySelectorAll('.channel-name span');
    const channelRemoveButton = nativeElement.querySelectorAll('.channel-name Button');
    fixture.whenStable().then(() => {
      expect(channelName).toBeTruthy();
      expect(channelName[0].innerHTML).toBe(team.channels[0].name);
      expect(channelName[1].innerHTML).toBe(team.channels[1].name);
      expect(channelRemoveButton).toBeTruthy();
      expect(channelRemoveButton[0].disabled).toBeFalsy();
      expect(channelRemoveButton[1].disabled).toBeFalsy();
    });
  }));

  it('Add Channel button should exist and should be disabled initially', async(() => {
    const nativeElement = fixture.nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const addChannelButton = nativeElement.querySelector('.add-channel button');
      expect(addChannelButton.disabled).toBe(true);
    });
  }));

  it('Add Channel button should not be enabled if data entered in input is empty or numeric', async(() => {
    const nativeElement = fixture.nativeElement;
    const addChannelInput = nativeElement.querySelector('.add-channel input');
    const addChannelButton = nativeElement.querySelector('.add-channel button');
    fixture.detectChanges();
    fixture.whenStable().then(res => {
      addChannelInput.value = "";
      addChannelInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(addChannelButton.disabled).toBe(true);
        addChannelInput.value = 1234;
        addChannelInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(addChannelButton.disabled).toBe(true);
        })
      })
    });
  }));

  it('Add Channel button should be enabled if data entered in input is correct and clicking on button should add the channel to the existing list', async(() => {
    const nativeElement = fixture.nativeElement;
    const addChannelInput = nativeElement.querySelector('.add-channel input');
    const addChannelButton = nativeElement.querySelector('.add-channel button');
    fixture.detectChanges();
    fixture.whenStable().then(res => {
      addChannelInput.value = "Channel0";
      addChannelInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(addChannelButton.disabled).toBe(false);
        addChannelButton.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const channelNames = nativeElement.querySelectorAll('.channel-name span');
          expect(channelNames[0].innerHTML).toBe("Channel2");
          expect(channelNames[1].innerHTML).toBe("Channel1");
          expect(channelNames[2].innerHTML).toBe("Channel3");
          expect(channelNames[3].innerHTML).toBe("Channel0");
        });
      })
    });
  }));

  it('Clicking on remove button should remove the channel from the list', async(() => {
    const nativeElement = fixture.nativeElement;
    const channelRemoveButton = nativeElement.querySelectorAll('.channel-name button');
    fixture.detectChanges();
    fixture.whenStable().then(res => {
      channelRemoveButton[1].click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const channelNames = nativeElement.querySelectorAll('.channel-name span');
        expect(channelNames.length).toBe(2);
        expect(channelNames[0].innerHTML).toBe("Channel2");
        expect(channelNames[1].innerHTML).toBe("Channel3");
      });
    });
  }));

  it('Clicking on sort button once list the channels in ascending order of names', async(() => {
    const nativeElement = fixture.nativeElement;
    const channelSortButton = nativeElement.querySelector('.sort');
    fixture.detectChanges();
    fixture.whenStable().then(res => {
      channelSortButton.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const channelNames = nativeElement.querySelectorAll('.channel-name span');
        expect(channelNames[0].innerHTML).toBe("Channel1");
        expect(channelNames[1].innerHTML).toBe("Channel2");
        expect(channelNames[2].innerHTML).toBe("Channel3");
      });
    });
  }));

  it('Clicking on sort button twice list the channels in descending order of names', async(() => {
    const nativeElement = fixture.nativeElement;
    const channelSortButton = nativeElement.querySelector('.sort');
    fixture.detectChanges();
    fixture.whenStable().then(res => {
      channelSortButton.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        channelSortButton.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const channelNames = nativeElement.querySelectorAll('.channel-name span');
          expect(channelNames[0].innerHTML).toBe("Channel3");
          expect(channelNames[1].innerHTML).toBe("Channel2");
          expect(channelNames[2].innerHTML).toBe("Channel1");
        });
      });
    });
  }));

  it('Clicking on sort button thrice list the channels according to creation order', async(() => {
    const nativeElement = fixture.nativeElement;
    const channelSortButton = nativeElement.querySelector('.sort');
    fixture.detectChanges();
    fixture.whenStable().then(res => {
      channelSortButton.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        channelSortButton.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          channelSortButton.click();
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            const channelNames = nativeElement.querySelectorAll('.channel-name span');
            expect(channelNames[0].innerHTML).toBe("Channel2");
            expect(channelNames[1].innerHTML).toBe("Channel1");
            expect(channelNames[2].innerHTML).toBe("Channel3");
          })
        });
      });
    });
  }));
});
