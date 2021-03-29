// Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

// Assets
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'shared/shared.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { RegistrationComponent } from './components/exercise1/common/registration/registration.component';
import { ScheduleComponent } from './components/exercise1/common/schedule/schedule.component';
import { CssTestComponent } from './components/exercise1/common/css-test/css-test.component';
import { CssResponsiveTestComponent } from './components/exercise1/common/css-responsive/css-responsive.component';
import { Exercise1Component } from './components/exercise1/exercise1.component';
import { Exercise2Component } from './components/exercise2/exercise2.component';
import { TimerComponent } from './components/exercise2/common/timer/timer.component';
import { ColorPickerComponent } from './components/exercise2/common/color-picker/color-picker.component';
import { Exercise3Component } from './components/exercise3/exercise3.component';
import { CartShopComponent } from './components/exercise3/cart-shop/cart-shop.component';
import { CartComponent } from './components/exercise3/cart-shop/components/cart/cart.component';
import { ProductListComponent } from './components/exercise3/cart-shop/components/product-list/product-list.component';
import { Exercise4Component } from './components/exercise4/exercise4.component';
import { MovieListComponent } from './components/exercise4/movie-list/movie-list.component';
import { CssSpinnerComponent } from './components/exercise1/common/css-spinner/css-spinner.component';
import { Exercise5Component } from './components/exercise5/exercise5.component';
import { Exercise6Component } from './components/exercise6/exercise6.component';

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    CssTestComponent,
    CssResponsiveTestComponent,
    RegistrationComponent,
    ScheduleComponent,
    Exercise1Component,
    Exercise2Component,
    TimerComponent,
    ColorPickerComponent,
    Exercise3Component,
    CartShopComponent,
    CartComponent,
    ProductListComponent,
    Exercise4Component,
    MovieListComponent,
    CssSpinnerComponent,
    Exercise5Component,
    Exercise6Component
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
