import {CHANGE_QUEUE} from '../actions/types';

const initialState = {
  currentQueue: [],
  playlistName: '',
  loading: true,
};

const queue = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case CHANGE_QUEUE:
      return {
        ...state,
        currentQueue: payload.queue,
        playlistName: payload.playlistName,
        loading: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default queue;
