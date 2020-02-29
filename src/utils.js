import TrackPlayer from 'react-native-track-player';
import {PermissionsAndroid} from 'react-native';
import store from './store';

export const addSongToQueue = async (songs, RNFS, playSong) => {
  console.log('adding to the queue');
  try {
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

    //if (JSON.stringify(q) === JSON.stringify(songs)) return;
    await TrackPlayer.add(songs);

    if (playSong) TrackPlayer.play();
  } catch (err) {
    console.error(err.message);
  }
};

export const seekForward = async seconds => {
  const position = await TrackPlayer.getPosition();
  TrackPlayer.seekTo(position + seconds);
};

export const seekBackward = async seconds => {
  const position = await TrackPlayer.getPosition();
  if (position < 5) await TrackPlayer.skipToPrevious();
  else TrackPlayer.seekTo(position + seconds);
};

export const prev = async () => {
  const position = await TrackPlayer.getPosition();
  if (position < 5) await TrackPlayer.skipToPrevious();
  else TrackPlayer.seekTo(0);
};

export const next = async () => {
  await TrackPlayer.skipToNext();
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

export const queueEndHandler = () => {
  console.log('queue ended');
};

export const trackChangeHandler = async () => {
  if (store.getState().player.repeat === 'SHUFFLE') {
    const currentSongId = await TrackPlayer.getCurrentTrack();
    const ids = store
      .getState()
      .queue.currentQueue.map((queue, index) => index)
      .filter(id => id !== currentSongId);

    TrackPlayer.skip(ids[Math.floor(Math.random() * ids.length)] + '');
  }
  console.log('track changed');
  console.log();
};
