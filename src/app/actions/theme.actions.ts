import { Action } from '@ngrx/store';
import { Theme } from '../settings/themes/theme';

export const EDIT_THEME = '[Theme] Edit';

export class EditTheme implements Action {
  readonly type = EDIT_THEME;
  constructor(public payload: Theme) {}
}
export type All = EditTheme;
