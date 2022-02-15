import * as FilterDayAction from '../actions/filterday.actions';

export type Action = FilterDayAction.All;

interface filterDay {
  day: Date;
  isSelected: Boolean;
}
const defaultDate = { date: new Date(), isSelected: false };

const newState = (state: filterDay, newData: filterDay) => {
  return newData;
};
export function filterDayReducer(state: any = defaultDate, action: any) {
  switch (action.type) {
    case FilterDayAction.EDIT_FILTERDAY:
      return newState(state, action.payload);
    default:
      return state;
  }
}
