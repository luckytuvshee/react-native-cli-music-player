import TrackPlayer from 'react-native-track-player';
import * as RNFS from 'react-native-fs';
import {addSongToQueue} from '../utils';

export const playQueue = index => async dispatch => {
  console.log('playQueue');
  TrackPlayer.skip(index + '');
  TrackPlayer.play();
};

export const addQueue = (songs, playSong) => async dispatch => {
  console.log('addQueue');
  const currentQueue = await TrackPlayer.getQueue();
  if (currentQueue.length > 0) await TrackPlayer.remove(songs);
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
