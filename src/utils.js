import TrackPlayer from 'react-native-track-player';
import {PermissionsAndroid, AppState} from 'react-native';
import store from './store';
import {SET_CURRENT_SONG_ID, STOP} from './actions/types';

export const addSongToQueue = async (songs, RNFS, playSong) => {
  try {
    songs = songs.map((song, index) => {
      const songWithName = song.split('/').pop();
      //const songName = songWithName.split(/\.mp3/)[0];
      const songName = songWithName.split('.mp3')[0].split('-');
      const artist = songName.slice(0, -1).join('-');
      const title = songName.slice(-1).join('');

      return {
        title: `${title.trim()}`,
        url: `${RNFS.ExternalStorageDirectoryPath}${song}`,
        artist: `${artist.trim()}`,
        id: index + '',
      };
    });

    await TrackPlayer.setupPlayer({maxCacheSize: 1024 * 5});
    await TrackPlayer.add(songs);

    if (playSong) TrackPlayer.play();
  } catch (err) {
    console.error(err.message);
  }
};

export const seekForward = async seconds => {
  if (playlistSelected() === false) return;
  const status = await TrackPlayer.getState();
  if (status === 1) return;

  const position = await TrackPlayer.getPosition();
  const duration = await TrackPlayer.getDuration();
  console.log(duration - position);
  if (Math.ceil(duration - position) <= 10) {
    TrackPlayer.seekTo(duration);
  } else {
    TrackPlayer.seekTo(position + seconds);
  }
};

export const seekBackward = async seconds => {
  if (playlistSelected() === false) return;
  const status = await TrackPlayer.getState();
  if (status === 1) return;

  const position = await TrackPlayer.getPosition();
  if (position < 5) {
    const currentSongId = store.getState().player.currentSongId;
    if (currentSongId === 0) {
      const currentQueue = await TrackPlayer.getQueue();
      await TrackPlayer.skip(currentQueue.length - 1 + '');
    } else await TrackPlayer.skipToPrevious();

    TrackPlayer.play();
  } else TrackPlayer.seekTo(position + seconds);
};

export const prev = async () => {
  if (playlistSelected() === false) return;
  const status = await TrackPlayer.getState();
  if (status === 1) return;

  const position = await TrackPlayer.getPosition();
  if (position < 5) {
    const currentId = await TrackPlayer.getCurrentTrack();
    if (currentId === '0') {
      const currentQueue = await TrackPlayer.getQueue();
      await TrackPlayer.skip(currentQueue.length - 1 + '');
    } else {
      await TrackPlayer.skipToPrevious();
    }
  } else {
    const status = await TrackPlayer.getState();
    if (status !== 2) TrackPlayer.seekTo(0); // 2 means ready to play
  }

  TrackPlayer.play();
};

export const next = async () => {
  if (playlistSelected() === false) return;
  const status = await TrackPlayer.getState();
  if (status === 1) return;

  const repeat = store.getState().player.repeat;
  const currentQueue = await TrackPlayer.getQueue();
  const currentId = await TrackPlayer.getCurrentTrack();

  if (repeat === 'SHUFFLE') {
    const randomId = randomIdGenerator(currentQueue, currentId);
    if (randomId !== undefined) {
      await TrackPlayer.skip(randomId + '');
    }
  } else {
    if (currentQueue.length - 1 == currentId) {
      await TrackPlayer.skip('0');
    } else {
      await TrackPlayer.skipToNext();
    }
  }

  TrackPlayer.play();
};

export const togglePlay = async () => {
  if (playlistSelected() === false) return;
  const status = await TrackPlayer.getState();

  if (status === 1) return;
  if (status === 3) TrackPlayer.pause();
  else TrackPlayer.play();
};

export const playlistSelected = () => {
  return store.getState().queue.playlistName !== '';
};

export const requestReadExternalStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Need storage read permission',
        message: 'Need permission xD',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage read Permission granted');
    } else {
      console.log('Storage read Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const randomIdGenerator = (currentQueue, currentId) => {
  const filteredQueue = currentQueue.filter(queue => queue.id !== currentId);
  const randomNumber = Math.floor(Math.random() * (filteredQueue.length - 1));
  const randomId = filteredQueue[randomNumber].id;
  return randomId;
};

export const queueEndHandler = async () => {
  const repeat = store.getState().player.repeat;
  const id = await TrackPlayer.getCurrentTrack();
  if (repeat === 'ALL' && id) {
    await TrackPlayer.skip('0');
  }
};

export const trackChangeHandler = async () => {
  console.log('track changed');
  const id = await TrackPlayer.getCurrentTrack();
  if (id) {
    console.log('id: ' + id);
    store.dispatch({type: SET_CURRENT_SONG_ID, payload: parseInt(id)});
  }
};

export const stopHandler = async () => {
  console.log('current state: ' + AppState.currentState);
  TrackPlayer.destroy();
  store.dispatch({type: STOP});
};

export const remoteDuckHandler = async (paused, permanent) => {
  console.log('paused: ' + paused);
  console.log('permanent: ' + permanent);
  if (paused || permanent) TrackPlayer.pause();
  else if (!paused) TrackPlayer.play();
};
