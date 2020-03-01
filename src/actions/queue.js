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
    console.log('saving ' + playlistName);
    await AsyncStorage.setItem('queueObject', JSON.stringify(queueObject));

    dispatch({
      type: CHANGE_QUEUE,
      payload: queueObject,
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const retrieveQueue = () => async dispatch => {
  try {
    const queueObject = await AsyncStorage.getItem('queueObject');

    // check if value is previously stored
    if (queueObject !== null) {
      const parsedQueueObject = JSON.parse(queueObject);
      console.log('retrieving ' + parsedQueueObject.playlistName);
      dispatch({
        type: CHANGE_QUEUE,
        payload: parsedQueueObject,
      });

      // add songs to the queue
      addSongToQueue(parsedQueueObject.queue, RNFS);
    }
  } catch (err) {
    console.error(err.message);
  }
};
