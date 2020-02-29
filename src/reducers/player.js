import {SET_CURRENT_SONG, CHANGE_REPEAT} from '../actions/types';

const initialState = {
  currentSong: '',
  repeat: 'ALL',
};

const player = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_CURRENT_SONG:
      return {
        currentSong: payload,
      };

    case CHANGE_REPEAT:
      return {
        repeat: payload,
      };

    default:
      return state;
  }
};

export default player;
