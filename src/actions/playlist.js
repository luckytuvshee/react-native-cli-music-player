import {GET_PLAYLISTS} from './types';
import * as RNFS from 'react-native-fs';

export const getPlaylists = () => async dispatch => {
  try {
    const res = await RNFS.readDir(
      `${RNFS.ExternalStorageDirectoryPath}/cmus/playlists`,
    );

    const playlists = res.map(playlist => {
      return {path: playlist.path, name: playlist.name};
    });

    const sortedPlaylist = playlists.sort((a, b) => (a.name > b.name ? 1 : -1));

    dispatch({
      type: GET_PLAYLISTS,
      payload: sortedPlaylist,
    });
  } catch (err) {
    console.error(err.message);
  }
};
