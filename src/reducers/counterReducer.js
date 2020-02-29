import {
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  SET_COUNTER,
} from '../actions/types';

const initialState = {
  counter: 4,
};

const counterReducer = (state = 10, action) => {
  switch (action.type) {
    case INCREASE_COUNTER:
      return state + 1;
    case DECREASE_COUNTER:
      return state - 1;
    case SET_COUNTER:
      return action.payload;
    default:
      return state;
  }
};

export default counterReducer;
