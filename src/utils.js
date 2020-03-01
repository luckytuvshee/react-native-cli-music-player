import TrackPlayer, {getCurrentTrack} from 'react-native-track-player';
import {PermissionsAndroid} from 'react-native';
import store from './store';
import {SET_CURRENT_SONG_ID} from './actions/types';

export const addSongToQueue = async (songs, RNFS, playSong) => {
  try {
    TrackPlayer.reset();
    songs = songs.map((song, index) => {
      const songWithName = song.split('/').pop();
      //const songName = songWithName.split(/\.mp3/)[0];
      const songName = songWithName.split('.mp3')[0].split('-');
      const artist = songName.slice(0, -1).join('-');
      const title = songName.slice(-1);

      return {
        title: `${title}`,
        url: `${RNFS.ExternalStorageDirectoryPath}${song}`,
        artist: `${artist}`,
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
  const position = await TrackPlayer.getPosition();
  const duration = await TrackPlayer.getDuration();
  console.log(duration - position);
  if (Math.ceil(duration - position) <= 5) {
    TrackPlayer.seekTo(duration);
  } else {
    TrackPlayer.seekTo(position + seconds);
  }
};

export const seekBackward = async seconds => {
  const position = await TrackPlayer.getPosition();
  if (position < 5) await TrackPlayer.skipToPrevious();
  else TrackPlayer.seekTo(position + seconds);
};

export const prev = async () => {
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
  const status = await TrackPlayer.getState();
  console.log(status);
  if (status === 3) TrackPlayer.pause();
  else TrackPlayer.play();
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
      console.log('You can read');
    } else {
      console.log('Storage read permission denied');
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
  if (repeat === 'ALL') {
    await TrackPlayer.skip('0');
  }
};

export const trackChangeHandler = async () => {
  console.log('track changed');
  const id = await TrackPlayer.getCurrentTrack();
  console.log('id: ' + id);
  store.dispatch({type: SET_CURRENT_SONG_ID, payload: parseInt(id)});
};
