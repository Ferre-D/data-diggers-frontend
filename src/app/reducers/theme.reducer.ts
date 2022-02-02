import * as ThemeActions from '../actions/theme.actions';
import { Theme } from '../settings/themes/theme';

export type Action = ThemeActions.All;

const defaultTheme: Theme = {
  id: 0,
  accentColor: '#00aa9c',
  primaryColor: '#232d4b',
  active: true,
  textWhite: true,
  logoUrl:
    'https://firebasestorage.googleapis.com/v0/b/data-diggers.appspot.com/o/logos%2Flogo.png?alt=media&token=9a58990e-1644-4afe-a6be-b593fad1dfa7',
};

const newstate = (state: Theme, newData: Theme) => {
  return Object.assign({}, state, newData);
};

export function themeReducer(state: any = defaultTheme, action: any) {
  console.log(action.type, state);
  switch (action.type) {
    case ThemeActions.EDIT_THEME:
      return newstate(state, action.payload);

    default:
      return state;
  }
}
