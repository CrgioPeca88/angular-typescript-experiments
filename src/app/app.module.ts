import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CssTestComponent } from './css-test/css-test.component';
import { CssResponsiveTestComponent } from './css-responsive/css-responsive.component';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    CssTestComponent,
    CssResponsiveTestComponent,
    RegistrationComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
