import TrackPlayer from 'react-native-track-player';
import * as RNFS from 'react-native-fs';
import {addSongToQueue} from '../utils';

export const playQueue = (song, index) => async dispatch => {
  TrackPlayer.skip(index.toString());
  TrackPlayer.play();
};

export const addQueue = (songs, playSong) => async dispatch => {
  addSongToQueue(songs, RNFS, playSong); // if playSong true, then play after add to the queue
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
