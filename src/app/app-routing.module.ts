// Dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

// Assets
import { Exercise1Component } from './components/exercise1/exercise1.component';
import { Exercise2Component } from './components/exercise2/exercise2.component';
import { Exercise3Component } from './components/exercise3/exercise3.component';
import { Exercise4Component } from './components/exercise4/exercise4.component';
import { Exercise5Component } from './components/exercise5/exercise5.component';

const routes: Routes = [{
  path: 'excercise1',
  component: Exercise1Component
}, {
  path: 'excercise2',
  component: Exercise2Component
}, {
  path: 'excercise3',
  component: Exercise3Component
}, {
  path: 'excercise4',
  component: Exercise4Component
}, {
  path: 'excercise5',
  component: Exercise5Component
}, {
  path: '',
  redirectTo: 'excercise1',
  pathMatch: 'prefix'
}]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
