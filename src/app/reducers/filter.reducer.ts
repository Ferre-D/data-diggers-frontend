import * as FilterAction from '../actions/filter.actions';

export type Action = FilterAction.All;

const defaultFilter = -1;

const newState = (state: number, newData: number) => {
  return newData;
};
export function filterReducer(state: any = defaultFilter, action: any) {
  switch (action.type) {
    case FilterAction.EDIT_FILTER:
      return newState(state, action.payload);
    default:
      return state;
  }
}
