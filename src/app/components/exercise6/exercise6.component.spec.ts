/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { TeamList } from './components/team-list/team-list.component';
import { TeamComponent } from './components/team-component/team-component.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TeamsChannelService } from './services/teams-channels.service';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
          AppComponent, TeamList, TeamComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        TeamsChannelService
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the Teams and Channels listing app which contains the teams', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const header: DebugElement = fixture.debugElement.query(By.css('.teams-list'));
    fixture.detectChanges();
    expect(header.nativeElement.innerHTML).toContain('team-name');
  }));
});
