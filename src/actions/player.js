import TrackPlayer from 'react-native-track-player';
import * as RNFS from 'react-native-fs';
import {addSongToQueue} from '../utils';

//AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => require('../components/service.js'));

export const playQueue = (song, index) => async dispatch => {
  TrackPlayer.skip(index.toString());
  TrackPlayer.play();
};

export const addQueue = songs => async dispatch => {
  addSongToQueue(songs, RNFS);
};

export const changeRepeat = repeat => dispatch => {
  try {
    dispatch({
      type: 'CHANGE_REPEAT',
      payload: repeat,
    });
  } catch (err) {
    console.error(err.message);
  }
};
