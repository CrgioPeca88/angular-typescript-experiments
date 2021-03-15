// Dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

// Assets
import { Exercise1Component } from './components/exercise1/exercise1.component';
import { Exercise2Component } from './components/exercise2/exercise2.component';
import { Exercise3Component } from './components/exercise3/exercise3.component';

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
  path: '',
  redirectTo: 'excercise1',
  pathMatch: 'prefix'
}]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
