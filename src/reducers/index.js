import {combineReducers} from 'redux';
import counterReducer from './counterReducer';
import playlists from './playlist';
import player from './player';
import queue from './queue';

const appReducer = combineReducers({
  counterReducer,
  playlists,
  queue,
  player,
});

const rootReducer = (state, action) => {
  if (action.type === 'STOP') {
    state.playlists = undefined;
    state.queue = undefined;
    state.player.stopped = true;
  }

  return appReducer(state, action);
};

export default rootReducer;
