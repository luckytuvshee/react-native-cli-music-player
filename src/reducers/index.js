import {combineReducers} from 'redux';
import counterReducer from './counterReducer';
import playlists from './playlist';
import player from './player';
import queue from './queue';

export default combineReducers({
  counterReducer,
  playlists,
  queue,
  player,
});
