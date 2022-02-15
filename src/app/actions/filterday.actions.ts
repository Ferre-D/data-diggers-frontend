import { Action } from '@ngrx/store';

export const EDIT_FILTERDAY = '[FilterDay] Edit';
interface filterDay {
  day: Date;
  isSelected: Boolean;
}
export class EditFilterDay implements Action {
  readonly type = EDIT_FILTERDAY;
  constructor(public payload: filterDay) {}
}
export type All = EditFilterDay;
