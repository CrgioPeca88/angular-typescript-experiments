// Dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

// Assets
import { Exercise1Component } from './components/exercise1/exercise1.component';

const routes: Routes = [{
  path: 'excercise1',
  component: Exercise1Component
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
