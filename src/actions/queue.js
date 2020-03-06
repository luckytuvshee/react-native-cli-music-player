import {CHANGE_QUEUE} from './types';
import * as RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-community/async-storage';
import {addSongToQueue} from '../utils';

export const changeQueue = (path, playlistName) => async dispatch => {
  const songs = await RNFS.readFile(path);

  try {
    const queueObject = {
      queue: songs.split('\n').slice(0, -1), // exlude last item
      playlistName,
    };

    dispatch({
      type: CHANGE_QUEUE,
      payload: queueObject,
    });
  } catch (err) {
    console.error(err.message);
  }
};
