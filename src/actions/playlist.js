import {GET_PLAYLISTS} from './types';
import * as RNFS from 'react-native-fs';

export const getPlaylists = () => async dispatch => {
  try {
    const res = await RNFS.readDir(
      `${RNFS.ExternalStorageDirectoryPath}/cmus/playlists`,
      'ascii',
    );

    dispatch({
      type: GET_PLAYLISTS,
      payload: res,
    });
  } catch (err) {
    console.error(err.message);
  }
};
