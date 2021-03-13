// Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Assets
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { RegistrationComponent } from './components/exercise1/common/registration/registration.component';
import { ScheduleComponent } from './components/exercise1/common/schedule/schedule.component';
import { CssTestComponent } from './components/exercise1/common/css-test/css-test.component';
import { CssResponsiveTestComponent } from './components/exercise1/common/css-responsive/css-responsive.component';
import { Exercise1Component } from './components/exercise1/exercise1.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    CssTestComponent,
    CssResponsiveTestComponent,
    RegistrationComponent,
    ScheduleComponent,
    Exercise1Component
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
