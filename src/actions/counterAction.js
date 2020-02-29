import {INCREASE_COUNTER, DECREASE_COUNTER, SET_COUNTER} from './types';

export const increaseCounter = () => ({
  type: INCREASE_COUNTER,
});

export const decreaseCounter = () => ({
  type: DECREASE_COUNTER,
});

export const setCounter = num => async dispatch => {
  dispatch({
    type: SET_COUNTER,
    payload: num,
  });
};
