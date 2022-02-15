import { Action } from '@ngrx/store';

export const EDIT_FILTER = '[Filter] Edit';

export class EditFilter implements Action {
  readonly type = EDIT_FILTER;
  constructor(public payload: number) {}
}
export type All = EditFilter;
