import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import { Team, Channel } from '../components/team-list/team-list.component';

export type FormControls = {
  [key: string]: AbstractControl;
}

export const PATTERN_CONTAIN_STRINGS: string = "[a-zA-Z].*";

@Injectable({
  providedIn: 'root'
})
export class TeamsChannelService {

	constructor() { }

  public formValidation(form: FormGroup): Observable<FormControls> {
    if (form.valid) {
      return of(form.controls);
    } else {
      throw new Error("Formulario invalido");
    };
  }

  public updateListElements<T>(listElements: T[], newElement: T): Observable<T[]> {
     return of(listElements).pipe(
      map((le: T[]) => {
        le.push(newElement);
        return le;
      })
    );
  }

}
